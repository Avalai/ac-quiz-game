import { useState, useEffect } from 'react'
import lodash from 'lodash'
import wiki from 'wikijs'

const nookipedia = wiki({
    apiUrl: 'https://nookipedia.com/w/api.php',
    origin: '*',
})
const pageFilter = ['Category:', 'User:']

const speciesMap = {  
    Bull: 'Bovine',
    Cow: 'Bovine', 
    Deer: 'Deer',
    Mouse: 'Mice', 
    Octopuses: 'Octopuses',
    Ostrich: 'Ostriches',
    Rhinoceros: 'Rhinoceroses‎',
    Sheep: 'Sheep',
    Wolf: 'Wolves',
}
const speciesPlural = species => species in speciesMap ? speciesMap[species] : `${species}s`

const speciesBlacklist = new Set(
    [
        ...Object.keys(speciesMap),
        'Octopus (fish)',
        'Frog (fish)',
    ]
)

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
            const allVillagers = (
                await nookipedia.pagesInCategory('Category:Villagers')
            ).filter(x => {
                if (pageFilter.some(prefix => x.startsWith(prefix))) {
                    return false
                }
                return true
            })
            // console.log(allVillagers.reverse())
            const primaryVillager = _.sample(allVillagers) //'Groucho'

            // Get the page data and parsed info about the main villager
            const getPrimaryVillager = await nookipedia.page(primaryVillager)
            const primaryInfo = await getPrimaryVillager.fullInfo()

            // Set personality and species variables
            const { personality, species } = primaryInfo.general

        // GET SAME PERSONALITY VILLAGERS
            const personalityVillagers = (
                await nookipedia.pagesInCategory(`Category:${personality} villagers`)
            ).filter( x => {
                if ([personality, primaryVillager].some(item => item === x)) {
                    return false
                }
                if (pageFilter.some(prefix => x.startsWith(prefix))) {
                    return false
                }
                return true
            })
            const samePersonalityVillager = _.sample(personalityVillagers) //'Peewee'

        // GET SAME SPECIES VILLAGERS

            const speciesVillagers = (
                await nookipedia.pagesInCategory(`Category:${speciesPlural(species)}`)
            ).filter( x => {
                if ([species, primaryVillager, samePersonalityVillager].some(item => item === x)) {
                    return false
                }
                if (speciesBlacklist.has(x)) {
                    return false
                }
                if (pageFilter.some(prefix => x.startsWith(prefix))) {
                    return false
                }
                return true
            })
            const sameSpeciesVillager = _.sample(speciesVillagers) // 'Klaus'

        // TESTS
            
            // console.table(primaryInfo.general)
            // console.log(personalityVillagers)
            // console.log(speciesVillagers)
            console.log(primaryVillager, personality, species)
            console.log(primaryVillager, samePersonalityVillager, sameSpeciesVillager)

        // SET STATES

            // Trimming Villager Names
            const trimName = name => name.split('(')[0].trim()
            primaryInfo.general.name = trimName(primaryInfo.general.name)
            const chosenVillagers = [
                primaryVillager, 
                samePersonalityVillager, 
                sameSpeciesVillager
            ].map(trimName)
            setVillagers(_.shuffle(chosenVillagers))

            // Saving info on the main villager
            setVillagerImage(await getPrimaryVillager.mainImage())
            // setVillagerImage('https://nookipedia.com/w/images/8/83/Groucho_NLa.png')
            setVillagerInfo(primaryInfo.general)
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