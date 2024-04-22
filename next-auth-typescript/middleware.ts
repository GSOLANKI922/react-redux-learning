import React from 'react'

const middleware = () => {
     const config = {
        matcher: [
          '/((?!api|_next/static|_next/image|favicon.ico).*)',
        ],
      }
}

export default middleware