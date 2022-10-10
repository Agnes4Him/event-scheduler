import { useState } from "react"

const EventStatus = ({itemDate}) => {

    const [ ahead, setAhead ] = useState(true)

        let d = new Date()
        let dYear = d.getFullYear() 
        let dMonth = d.getMonth() 
        let dDay = d.getDate()

        let savedDate = itemDate.split("T")[0]
        let modDate = savedDate.split("-")
        let savedYear = parseInt(modDate[0])
        let savedMonth = parseInt(modDate[1])
        let savedDay = parseInt(modDate[2])

        if ((savedMonth > dMonth) && (savedYear > dYear)) {
            setAhead(true)
        }else if ((savedMonth < dMonth) && (savedYear > dYear)) {
            setAhead(true)
        }else if ((savedMonth > dMonth) && (savedYear < dYear)) {
            setAhead(false)
        }else if ((savedMonth < dMonth) && (savedYear < dYear)) {
            setAhead(false)
        }else if ((savedMonth === dMonth) && (savedYear === dYear) && (savedDay > dDay)) {
            setAhead(true)
        }else if ((savedMonth === dMonth) && (savedYear === dYear) && (savedDay < dDay)) {
            setAhead(false)
        }

    return (
        <div>
            {ahead && <p>Ahead</p>}
            {!ahead && <p>Ahead</p>}
        </div>
    )
}

export default EventStatus