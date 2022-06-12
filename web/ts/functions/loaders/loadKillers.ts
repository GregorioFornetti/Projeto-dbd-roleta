import IndependentRouletteContainer from "../../classes/IndependentRouletteContainer.js"
import RouletteButton from "../../classes/RouletteButton.js"
import SelectButton from "../../classes/SelectButton.js"
import KillerInfo from "../../interfaces/KillerInfo.js"
import createIconWithTooltip from "../createIconWithTooltip.js"
import deselectAll from "../deselectAll.js"
import selectAll from "../selectAll.js"


function createKillerIconWithTooltip(object: KillerInfo) {
    let tooltip_text = `<h2 class='h5'>${object.alias}</h2>`
    return createIconWithTooltip(tooltip_text, object.icon)
} 

export default async function loadKillersCharacters() {
    await fetch("https://raw.githubusercontent.com/GregorioFornetti/Projeto-dbd-roleta/main/data/killers/killers.json")
    .then((response) => response.json())
    .then((killers: KillerInfo[]) => {
        const killerBtnClass = 'btn-character'
        const killerModal = document.getElementById("modal-killers-characters-body") as HTMLElement
        const killerSelectionButtons: SelectButton<KillerInfo>[] = []
        const killersContainer = new IndependentRouletteContainer<KillerInfo>(killers)
        const killerPlaceholderSrc = "imgs/character-background.png"

        for (let killer of killers) {
            let icon = createKillerIconWithTooltip(killer)
            let killerSelectionBtn = new SelectButton<KillerInfo>(
                killer,
                killersContainer,
                icon,
                killerBtnClass,
                killerModal
            )
            killerSelectionButtons.push(killerSelectionBtn)
        }

        const rouletteContainer = document.getElementById("killers-characters-roulette") as HTMLElement
        const killer_roulette_button = new RouletteButton<KillerInfo>(
            killersContainer,
            rouletteContainer,
            createKillerIconWithTooltip,
            killerBtnClass,
            killerPlaceholderSrc
        )
        
        const btnSelectAllKillers = document.getElementById('btn-select-all-killers-characters') as HTMLButtonElement
        btnSelectAllKillers.addEventListener("click", () => {
            selectAll(killerSelectionButtons)
        })

        const btnDeselectAllKillers = document.getElementById('btn-diselect-all-killers-characters') as HTMLButtonElement
        btnDeselectAllKillers.addEventListener('click', () => {
            deselectAll(killerSelectionButtons)
        })
    })
}
