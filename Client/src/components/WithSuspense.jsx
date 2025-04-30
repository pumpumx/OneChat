import React, { Suspense } from 'react'

import Spinner from './Utils/Spinner'
export function WithSuspense(LazyComponent , fallback=<Spinner/>){
        return(
            <Suspense fallback={fallback}>
                <LazyComponent />
            </Suspense>
        )
} 

export default WithSuspense