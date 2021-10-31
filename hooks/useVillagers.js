import { useState, useEffect } from 'react'
import lodash from 'lodash'

const nookipediaApi = async (params) => {
    const nookipedia = new URL("https://api.nookipedia.com/villagers")
    nookipedia.search = new URLSearchParams(params).toString()

    const response = await fetch(nookipedia, {
        "method": "GET",
        "headers": {
            "X-API-KEY": "process.env.NOOKIPEDIA_KEY",
            "Accept-Version": "1.4.0"
        }
    })
    
    return response.json()
}

export default function useVillagers() {

    // STATES
    const [villagers, setVillagers] = useState([])
    const [villagerImage, setVillagerImage] = useState()
    const [villagerInfo, setVillagerInfo] = useState([])

    const [guess, setGuess] = useState('')
    // const [showResult, setShowResult] = useState(false)

    const [loading, setLoading] = useState(true)
    const [reload, setReload] = useState(0)

    const [score, setScore] = useState(0)
    const [count, setCount] = useState(0)


    useEffect(() => {
        const fetchVillagers = async () => {
        // GET THE MAIN VILLAGER
            const allVillagers = await nookipediaApi({excludedetails: true})
            const primaryVillager = _.sample(allVillagers) //'Groucho'

            // Get the full data about the main villager (by name)
            const getPrimaryVillager = await nookipediaApi({name: primaryVillager})
            // There are a few villagers with the same name, so pick one of them from the response (or the only one)
            const primaryInfo = _.sample(getPrimaryVillager)

            // Set personality and species variables
            const villagerPersonality = primaryInfo.personality
            const villagerSpecies = primaryInfo.species

        // GET SAME PERSONALITY VILLAGERS
            const personalityVillagers = await nookipediaApi({personality: villagerPersonality, excludedetails: true})
            const samePersonalityVillager = _.sample(personalityVillagers) //'Peewee'

        // GET SAME SPECIES VILLAGERS
            const speciesVillagers = await nookipediaApi({species: villagerSpecies, excludedetails: true})
            const sameSpeciesVillager = _.sample(speciesVillagers) // 'Klaus'

        // TESTS
            
            // console.log(allVillagers)
            // console.log(personalityVillagers)
            // console.log(speciesVillagers)
            // console.log(primaryVillager, villagerPersonality, villagerSpecies)
            // console.log(primaryVillager, samePersonalityVillager, sameSpeciesVillager)

        // SET STATES
            setVillagers(_.shuffle([primaryVillager, samePersonalityVillager, sameSpeciesVillager]))

            // Saving info on the main villager
            setVillagerImage(primaryInfo.image_url)
            setVillagerInfo({name: primaryInfo.name, personality: villagerPersonality, species: villagerSpecies})
            // setVillagerInfo({name: 'Groucho', personality: 'Cranky', species: 'Bear'})

            // Turn off loading state
            setLoading(false)
        }
        fetchVillagers()
    }, [reload])

    const nextChallenge = () => {
        setReload(reload + 1)
        setLoading(true)
        setGuess('')
    }

    const submitGuess = (villager) => {
        setGuess(villager)
        setCount(count + 1)
        if ((villagerInfo.name).startsWith(villager)) {
            setScore(score + 1)
        }
    }

    const clearScore = () => {
        setScore(0)
        setCount(0)
        setReload(0)
    }
    return (
        {
            villagers,
            villagerImage,
            villagerInfo,
            guess,
            loading,
            score,
            count,
            nextChallenge,
            submitGuess,
            clearScore
        }
)
}