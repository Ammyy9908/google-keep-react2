import React from 'react'
import '../Note.css'
import {motion} from 'framer-motion'

function Note({title,content,color}) {
    
    return (
        <motion.div className="note" layout style={{"backgroundColor":color}}>
            <h1>{title}</h1>
                    <h3>{content}</h3>

        </motion.div>
    )
}

export default Note
