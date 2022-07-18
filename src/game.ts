import {clamp} from "./utils";
import {hideAllPoppers} from "floating-vue";
import {reactive} from "vue";
import progress from "./progress";
import {chapters, currentChapter} from "./chapters/chapters";
import {Level} from "./chapters/level";
import {chapter1Levels} from "./chapters/chapter1";

export const state = reactive({
    progress: progress,
    level: chapter1Levels[0] as Level, // Holds current level info
    levelTimeout: 1000, // Delay between levels after completing
    menuOpened: false
})

state.progress.load()

export function closeMenu(){
    state.menuOpened = false;
}

// Reset all progress
// * Removes checkmarks from level header and list
// * Scrolls level menu to top
// * Resets the progress object

export function resetProgress(){
    if(confirm("Do you really want to reset your progress ?")){
        state.progress.reset();
        loadLevel();
        closeMenu();
    }
}

export function completeLevel(){
    state.progress.completeLevel();
    changeLevel(state.progress.currentChapter, state.progress.currentLevel+1)        
}

export function changeLevel(chapterNumber: number, levelNumber: number){
    const chapter = chapters[chapterNumber-1]
    if(levelNumber > chapter.levels.length && chapterNumber < chapters.length) {
        chapterNumber++;
        levelNumber = 0;
    } else if(levelNumber < 0 && chapterNumber > 1){
        chapterNumber = Math.max(1, chapterNumber-1)
        levelNumber = chapters[chapterNumber-1].levels.length
    }

    state.progress.currentChapter = clamp(chapterNumber, 1, chapters.length)
    state.progress.currentLevel = clamp(levelNumber, 0, chapters[chapterNumber-1].levels.length)
    hideAllPoppers()
    loadLevel();
    closeMenu();
}

export function loadLevel(){
    // Make sure we don't load a level we don't have
    const chapter = currentChapter.value
    const levels = chapter.levels
    state.progress.currentLevel = clamp(state.progress.currentLevel, 0, levels.length)
    state.level = levels[state.progress.currentLevel-1] as Level;
    state.progress.save()
    if(chapter.onLevelStart) chapter.onLevelStart(state.level)
}