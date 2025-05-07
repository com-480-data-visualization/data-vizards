import numpy as np
from IPython.display import display, Markdown

np.random.seed(42)
def select_random_questions_and_clean(df_meta_answers, df_clean, selected_topic, nbr_of_questions=2):
    """
    Selects a random subset of questions from a given topic and cleans the dataset by:
    - Keeping only relevant question columns and country
    - Removing rows with any negative answers

    Parameters:
        df_meta_answers (pd.DataFrame): Metadata with question indices and topics
        df_clean (pd.DataFrame): Full dataset of responses
        selected_topic (str): The topic from which to sample questions
        nbr_of_questions (int): How many questions to randomly select

    Returns:
        selected_questions (pd.DataFrame): The sampled question metadata
        df_valid_answers (pd.DataFrame): The cleaned subset of data with only valid responses
    """
    # Select random questions
    if selected_topic == 'Global':
        selected_questions = df_meta_answers[~(df_meta_answers['topic'] == 'Demographics')].sample(n=nbr_of_questions)
    else:
        selected_questions = df_meta_answers[df_meta_answers['topic'] == selected_topic].sample(n=nbr_of_questions)

    # Extract relevant question indices and country
    meaningful_features = selected_questions['index'].tolist() 
    meaningful_features.append('B_COUNTRY_ALPHA')  

    # Subset the clean data
    df_valid_answers = df_clean[meaningful_features]

    # Filter out rows with negative numeric answers (Not valid answers)
    numeric_cols = df_valid_answers.select_dtypes(include='number').columns
    original_count = df_valid_answers.shape[0]
    df_valid_answers = df_valid_answers[df_valid_answers[numeric_cols].ge(0).all(axis=1)]

    removed_participants = original_count - df_valid_answers.shape[0]
    print(f" Removed {removed_participants} participants who did not answer all selected questions.")


    return selected_questions, df_valid_answers


    from IPython.display import display, Markdown
import warnings
warnings.filterwarnings('ignore')

def run_matching_quiz_manhattan(selected_questions, df_valid_answers):
    """
    Runs an interactive matching quiz where the user answers selected survey questions,
    and the top 5 country matches are displayed based on similarity.

    Parameters:
        selected_questions (pd.DataFrame): Metadata for selected questions to ask the user
        df_valid_answers (pd.DataFrame): Cleaned survey responses including 'B_COUNTRY_ALPHA'

    Returns:
        user_answers (list of dict): List of answered questions with values and normalization ranges
        final_top_matches (pd.DataFrame): Final top 5 country matches based on cumulative distance
    """
    user_answers = []
    df_distance = df_valid_answers[['B_COUNTRY_ALPHA']].copy()
    df_distance['Distance'] = 0

    for i, (_, row) in enumerate(selected_questions.iterrows(), 1):
        print(f"\n🔹 Question {i}")
        print(f"🧠 {row['overall_question']}")
        print(f"❓ {row['specific_question']}")
        
        if isinstance(row['possible_answers'], dict):
            print("📋 Possible answers:")
            for k, v in row['possible_answers'].items():
                print(f"  {v}. {k}")

            while True:
                try:
                    answer = int(input("👉 Your answer (enter number): "))
                    if answer in row['possible_answers'].values():
                        break
                    else:
                        print("⚠️ Invalid answer number. Try again.")
                except ValueError:
                    print("⚠️ Please enter a number.")

            print(f"✅ You selected: {answer}")

            # Update distance based on normalized difference
            df_distance['Distance'] += abs(df_valid_answers[row['index']] - answer) / len(row['possible_answers'])

            # Show current top matches
            top_matches = df_distance.groupby('B_COUNTRY_ALPHA').mean(numeric_only=True).reset_index()
            top_matches['Score (%)'] = (1 - (top_matches['Distance'] /i)) * 100
            top_matches = top_matches.sort_values(by='Distance').head(5)

            display(Markdown("### 🌍 Your Top 5 Matches:"))
            display(top_matches[['B_COUNTRY_ALPHA', 'Score (%)']].style.format({'Score (%)': '{:.1f}'}))

            user_answers.append({
                'question_idx': row['index'],
                'answer': answer,
                'range': len(row['possible_answers'])
            })

    final_top_matches = top_matches[['B_COUNTRY_ALPHA', 'Score (%)']]
    return user_answers, final_top_matches

def run_matching_quiz_euclidean(selected_questions, df_valid_answers):
    """
    Runs an interactive matching quiz where the user answers selected survey questions,
    and the top 5 country matches are displayed based on similarity.

    Parameters:
        selected_questions (pd.DataFrame): Metadata for selected questions to ask the user
        df_valid_answers (pd.DataFrame): Cleaned survey responses including 'B_COUNTRY_ALPHA'

    Returns:
        user_answers (list of dict): List of answered questions with values and normalization ranges
        final_top_matches (pd.DataFrame): Final top 5 country matches based on cumulative distance
    """
    user_answers = []
    df_distance = df_valid_answers[['B_COUNTRY_ALPHA']].copy()
    df_distance['Distance'] = 0

    for i, (_, row) in enumerate(selected_questions.iterrows(), 1):
        print(f"\n🔹 Question {i}")
        print(f"🧠 {row['overall_question']}")
        print(f"❓ {row['specific_question']}")
        
        if isinstance(row['possible_answers'], dict):
            print("📋 Possible answers:")
            for k, v in row['possible_answers'].items():
                print(f"  {v}. {k}")

            while True:
                try:
                    answer = int(input("👉 Your answer (enter number): "))
                    if answer in row['possible_answers'].values():
                        break
                    else:
                        print("⚠️ Invalid answer number. Try again.")
                except ValueError:
                    print("⚠️ Please enter a number.")

            print(f"✅ You selected: {answer}")

            # Update distance based on normalized difference
            df_distance['Distance'] += (df_valid_answers[row['index']] - answer)**2 / len(row['possible_answers'])

            # Show current top matches
            top_matches = df_distance.groupby('B_COUNTRY_ALPHA').mean(numeric_only=True).reset_index()
            top_matches['Distance'] = top_matches['Distance'].apply(lambda x: np.sqrt(x))
            top_matches['Score (%)'] = (1 - (top_matches['Distance'] /i)) * 100
            top_matches = top_matches.sort_values(by='Distance').head(5)

            display(Markdown("### 🌍 Your Top 5 Matches:"))
            display(top_matches[['B_COUNTRY_ALPHA', 'Score (%)']].style.format({'Score (%)': '{:.1f}'}))

            user_answers.append({
                'question_idx': row['index'],
                'answer': answer,
                'range': len(row['possible_answers'])
            })

    final_top_matches = top_matches[['B_COUNTRY_ALPHA', 'Score (%)']]
    return user_answers, final_top_matches

