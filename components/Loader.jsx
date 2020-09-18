import React from 'react'
import { Backdrop, CircularProgress } from '@material-ui/core'

const Loader = ({open}) => {
  return (
    <div className="z-10 absolute">
    <Backdrop open={open} >
        <CircularProgress color="primary" />
    </Backdrop>
</div>
  )
}

export default Loader
