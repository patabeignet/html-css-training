import {Level, levels} from "./levels";
import {clamp} from "./utils";
import {createTooltip, hideAllPoppers} from "floating-vue";
import {nextTick, reactive} from "vue";
import progress from "./progress";

export const state = reactive({
    progress: progress,
    currentLevel: 0,
    level: levels[0], // Holds current level info
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
    const solutionMatches = Array.from(baseTable.querySelectorAll(state.level.selector)) // What the correct rule finds

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
        if(!state.progress.hasFinished()){
            setTimeout(function(){
                state.progress.currentLevel++;
                loadLevel();
            }, state.levelTimeout);
        }
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

export function changeLevel(n: number){
    state.progress.currentLevel = clamp(n, 1, levels.length)
    hideAllPoppers()
    loadLevel();
    closeMenu();
}

export function loadLevel(){
    // Make sure we don't load a level we don't have
    state.progress.currentLevel = clamp(state.progress.currentLevel, 1, levels.length)
    state.level = levels[state.progress.currentLevel-1] as Level;
    state.progress.save()
    document.querySelector("input")?.focus();
    nextTick(() => addBoardElementsTooltips()).then()
}