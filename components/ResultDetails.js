export default (props) => {

    // const genderMap = { Male: 'He', Female: 'She' }
    // const villagerGender = genderMap[villagerInfo.gender]

    return (
        <>
        { props.showResult &&
            <p>
                <b>{ props.villagerInfo.name }</b> is a { props.villagerInfo.personality } { props.villagerInfo.species } villager.
            </p>
        }
            {/* <p><a href={`https://nookipedia.com/wiki/${props.villagerInfo.name}`}>Read More</a></p> */}
        </>
    )
}