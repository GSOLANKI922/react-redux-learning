import React from 'react'
import Data from './List'

const ListData = () => {
  return (
    <div>
    <h1>name</h1>
    {
        Data.map((elem, index) => {
            return(
                <ul style={{border:"2px solid red"}}>
                    <li>{elem.name}</li>
                    <li>{elem.age}</li>
                </ul>
            )
        })
    }
    
      <h1>{Data.name}</h1>
    </div>
  )
}

export default ListData

