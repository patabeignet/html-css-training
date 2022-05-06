import {clamp} from "./utils";
import {createTooltip, hideAllPoppers} from "floating-vue";
import {nextTick, reactive} from "vue";
import progress from "./progress";
import {chapters} from "./chapters/chapters";
import {Level} from "./chapters/level";
import {chapter1Levels} from "./chapters/chapter1";
import {Chapter2Level} from "./chapters/chapter2";

export const state = reactive({
    progress: progress,
    currentLevel: 0,
    level: chapter1Levels[0] as Level, // Holds current level info
    levelTimeout: 1000, // Delay between levels after completing
    menuOpened: false
})

state.progress.load()

export function closeMenu(){
    state.menuOpened = false;
}

export function addBoardElementsTooltips(){
    const elements = Array.from(document.querySelectorAll("#board *"))
    elements.forEach(el => {
        createTooltip(el, {
            triggers: ["hover"],
            content: getTooltipContent(el),
            delay: 0
        }, null)
        el.addEventListener("mouseover", (e) => e.stopPropagation())
        el.addEventListener("mouseenter", (e) => e.stopPropagation())
    })
}

function getTooltipContent(el: Element) {
    const tagName = el.tagName.toLowerCase()
    const elClass = el.getAttribute("class")
    const elId = el.getAttribute("id")
    return `<${tagName}${elId ? ` id="${elId}"` : ''}${elClass ? ` class="${elClass}"` : ''}>`
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

export function fireRule(rule: string) {
    const level = state.level as Chapter2Level;

    Array.from(document.querySelectorAll(".shake, .strobe"))
        .forEach(el => el.classList.remove("shake","strobe"));

    // var baseTable = $('.table-wrapper > .table, .table-wrapper > .nametags, .table-wrapper > .table-surface');
    const baseTable = document.querySelector('#board')!;

    // Check if selector will throw an error trying the mystery rule
    // If it errors out, change the rule to null so the wrong-guess animation will work
    try {
        baseTable.querySelectorAll(rule)
    }
    catch(err) {
        rule = "";
    }

    const matches = rule ? Array.from(baseTable.querySelectorAll(rule)) : []; // What the person finds
    const solutionMatches = Array.from(baseTable.querySelectorAll(level.selector)) // What the correct rule finds

    let win = false;

    // If nothing is selected
    if(matches.length == 0) {
        document.querySelector(".editor")!.classList.add("shake");
    }

    if(matches.length === solutionMatches.length && matches.length > 0){
        win = checkResults(matches, solutionMatches);
    }

    if(win){
        matches.forEach(el => {
            el.classList.remove("strobe")
            el.classList.add("clean")
        });
        const editorInput = document.querySelector(".editor input") as HTMLInputElement
        editorInput.value = ""

        //$(".input-wrapper").css("opacity",.2);
        state.progress.completeLevel();

        setTimeout(function(){
            changeLevel(state.progress.currentChapter, state.progress.currentLevel+1)
        }, state.levelTimeout);

    } else {
        matches.forEach(el => {
            el.classList.remove("strobe");
            el.classList.add("shake")
        })

        setTimeout(function(){
            Array.from(document.querySelectorAll(".shake")).forEach(el => el.classList.remove("shake"))
            Array.from(document.querySelectorAll(".strobe")).forEach(el => el.classList.remove("strobe"))
            solutionMatches.forEach(el => { el.classList.add("strobe"); })
        },500);
    }
}

function checkResults(matches: Element[], solutionMatches: Element[]){
    return matches.length === solutionMatches.length
    && matches.every(el => solutionMatches.includes(el))
}

export function changeLevel(chapterNumber: number, levelNumber: number){
    const chapter = chapters[chapterNumber-1]
    if(levelNumber > chapter.levels.length) {
        chapterNumber++;
        if(chapterNumber > chapters.length){
            chapterNumber = 1
        }
        levelNumber = 1;
    } else if(levelNumber < 1){
        chapterNumber = Math.max(1, chapterNumber-1)
        levelNumber = chapters[chapterNumber-1].levels.length
    }

    state.progress.currentChapter = clamp(chapterNumber, 1, chapters.length)
    state.progress.currentLevel = clamp(levelNumber, 1, chapters[chapterNumber-1].levels.length)
    hideAllPoppers()
    loadLevel();
    closeMenu();
}

export function loadLevel(){
    // Make sure we don't load a level we don't have
    const levels = chapters[state.progress.currentChapter-1].levels
    state.progress.currentLevel = clamp(state.progress.currentLevel, 1, levels.length)
    state.level = levels[state.progress.currentLevel-1] as Level;
    state.progress.save()
    document.querySelector("input")?.focus();
    nextTick(() => addBoardElementsTooltips()).then()
}