import { MacroTotals } from '@/nutrition/macroTypes';
import * as SQLite from 'expo-sqlite';
import { validateMacros } from './validation';


// Database connection
let database: SQLite.SQLiteDatabase | null = null;

export async function initDatabase(): Promise<SQLite.SQLiteDatabase> {
    if (database) return database;

    database = await SQLite.openDatabaseAsync('macro_log.db');

    await database.execAsync('PRAGMA foreign_keys = ON;');
    await database.execAsync(`
        CREATE TABLE IF NOT EXISTS character (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            level INTEGER NOT NULL DEFAULT 1,
            xp INTEGER NOT NULL DEFAULT 0,
            total_xp_earned INTEGER NOT NULL DEFAULT 0,
            streak INTEGER NOT NULL DEFAULT 0,
            target_calories INTEGER NOT NULL DEFAULT 0,
            target_protein INTEGER NOT NULL DEFAULT 0,
            target_carbs INTEGER NOT NULL DEFAULT 0,
            target_fat INTEGER NOT NULL DEFAULT 0,
            strength_potential INTEGER NOT NULL DEFAULT 0,
            endurance_potential INTEGER NOT NULL DEFAULT 0,
            recovery_potential INTEGER NOT NULL DEFAULT 0
        );
        
        CREATE TABLE IF NOT EXISTS daily_logs (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            character_id INTEGER NOT NULL,
            date TEXT NOT NULL,
            calories INTEGER NOT NULL,
            protein INTEGER NOT NULL,
            carbs INTEGER NOT NULL,
            fat INTEGER NOT NULL,
            xp_earned INTEGER NOT NULL,
            FOREIGN KEY (character_id) REFERENCES character(id)  
        );
        
        CREATE INDEX IF NOT EXISTS index_date ON daily_logs(date);
    `);

    return database;
}

// Row layout coming back from daily_logs
export type DailyLogRow = {
    id: number;
    character_id: number;
    date: string;
    calories: number;
    protein: number;
    carbs: number;
    fat: number;
    xp_earned: number;
};

// Stores one day's macros. Validation checks first to reject invalid values
// before they reach the database
// Uses parameterized queries as second layer of Defense in Depth
export async function saveDailyLog(
    character_id: number,
    date: string,
    macros: MacroTotals,
    xp_earned: number,
): Promise<void> {
    const validation = validateMacros(macros);

    if (!validation.valid) {
        throw new Error(`Invalid macros: ${validation.error}`);
    }

    const db = await initDatabase();

    await db.runAsync(
        `INSERT INTO daily_logs
            (character_id, date, calories, protein, carbs, fat, xp_earned)
        VALUES (?, ?, ?, ?, ?, ?, ?)`,
        character_id, date, macros.calories, macros.protein, macros.carbs, 
        macros.fat, xp_earned,
    );

}

// Returns every macro log between two specified dates
    export async function getLogsByDateRange(
        startDate: string,
        endDate: string,
    ):  Promise<DailyLogRow[]> {
            const db = await initDatabase();

            return await db.getAllAsync<DailyLogRow> (
                `SELECT * FROM daily_logs
                WHERE date BETWEEN ? AND ?
                ORDER BY date`,
                startDate, endDate,
            );
    }

    // Row layout coming back from character table
    export type CharacterRow = {
        id: number;
        name: string;
        level: number;
        xp: number;
        total_xp_earned: number;
        streak: number;
        target_calories: number;
        target_protein: number;
        target_carbs: number;
        target_fat: number;
        strength_potential: number;
        endurance_potential: number;
        recovery_potential: number;
    };


    // Inserts a new character and returns the id assigned
    export async function saveCharacter(name: string, targets: MacroTotals): Promise<number> {
        const validation = validateMacros(targets);

        if (!validation.valid) {
            throw new Error(`Invalid targets: ${validation.error}`);
        }

        const db = await initDatabase();

        const result = await db.runAsync(
            `INSERT INTO character (name, target_calories, target_protein, target_carbs, target_fat) VALUES (?, ?, ?, ?, ?)`,
            name, targets.calories, targets.protein, targets.carbs, targets.fat
        );

        return result.lastInsertRowId;

    }

    // Load existing character
    export async function loadCharacter(): Promise<CharacterRow | null> {

        const db = await initDatabase();

        return await db.getFirstAsync<CharacterRow>(
            `SELECT * FROM character ORDER BY id LIMIT 1`,
        );
    }

    // Adds the character progression back to database after day's XP has been applied
    export async function updateCharacter(
        id: number,
        level: number,
        xp: number,
        totalXPEarned: number,
        streak: number,
    ): Promise<void> {
        const db = await initDatabase();

        await db.runAsync(
            `UPDATE character
            SET level = ?, xp = ?, total_xp_earned = ?, streak = ?
            WHERE id = ?`,
            level, xp, totalXPEarned, streak, id,
        );
    }