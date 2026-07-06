import sqlite3

def init_db():
    conn = sqlite3.connect("macro_log.db")
    cursor = conn.cursor()
    cursor.execute("""
        CREATE TABLE IF NOT EXISTS daily_logs (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            date TEXT NOT NULL,
            calories INTEGER,
            protein INTEGER,
            carbs INTEGER,
            fat INTEGER,
            xp_earned INTEGER
        )
    """)
    conn.commit()
    conn.close()

def save_daily_log(date, calories, protein, carbs, fat, xp_earned):
    conn = sqlite3.connect("macro_log.db")
    cursor = conn.cursor()
    cursor.execute("""
        INSERT INTO daily_logs (date, calories, protein, carbs, fat, xp_earned)
        VALUES (?, ?, ?, ?, ?, ?)
    """, (date, calories, protein, carbs, fat, xp_earned))
    conn.commit()
    conn.close()

def get_all_logs():
    conn = sqlite3.connect("macro_log.db")
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM daily_logs")
    rows = cursor.fetchall()
    conn.close()
    return rows

if __name__ == "__main__":
    init_db()
    save_daily_log("2026-06-04", 2100, 160, 220, 70, 92)
    for row in get_all_logs():
        print(row)
