'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import AddressModal from './AddressModal'

const AddAddressButtont = () => {
    const [isAdding, setIsAdding] = useState(false)
    return (
        <>
            <Button className='w-max' onClick={() => setIsAdding(true)}>Add Address</Button>
            {isAdding && <AddressModal onClose={() => setIsAdding(false)} />}
        </>
    )
}

export default AddAddressButtont