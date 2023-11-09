import PropTypes from "prop-types"

const SelectTopic = ({list, selectedList, setSelectedList}) => {
    const addToSelected = (itemId) => {
        let oTopic;
        let topicIsThere = false
        const sTopics = selectedList
        for (const topic of list) {
            if (topic._id === itemId) {
                oTopic = topic
                break
            } 
        }

        sTopics.forEach((topic, index)=>{
            if (topic._id === itemId){
                sTopics.splice(index, 1)
                topicIsThere = true
            }
        })

        if (topicIsThere){
            return setSelectedList([...sTopics])
        }
        setSelectedList([...sTopics, oTopic])
    }
  return (
    <div className="topic-select">
        {list.map(( topic ) => {
            return (
                <span key={topic._id} onClick={(e)=>{
                    e.target.classList.toggle("topic-selected")
                    addToSelected(topic._id)
                }}
                className={ selectedList.find(obj => obj._id === topic._id) && "topic-selected" }
                > 
                    {topic.title} 
                </span>
            )
        })}
    </div>
  )
}

SelectTopic.propTypes = {
    list: PropTypes.array.isRequired,
    setSelectedList: PropTypes.func.isRequired,
    selectedList: PropTypes.array.isRequired
}


export default SelectTopic