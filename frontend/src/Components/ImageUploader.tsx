import React, { useState } from 'react'
import { imageProps } from '../types'
import axios from 'axios'

type ImageUploaderProps = {
    photo: imageProps[]
    setPhoto: React.Dispatch<React.SetStateAction<imageProps[]>>
}

const ImageUploader = ({photo, setPhoto}: ImageUploaderProps) => {
    const [uploading, setUploading] = useState<boolean>(false)

    const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement> | React.DragEvent<HTMLDivElement>, files: FileList | null) => {
        if(files === null){
            return
        }

        setUploading(true)
        const data = new FormData()
        data.append('photo', files[0])

        try {
            const {data:image} = await axios.post('/auth/upload', data, {
            headers: {'Content-Type':'multipart/form-data'}
            })
            setUploading(false)
            setPhoto(image) 
        } catch (error) {
            console.log(error)
        }
    }


    return (
        <div>
            <label className='p-2 bg-gray-200 rounded-md opacity-75 text-[12px] hover:cursor-pointer'>
                <input onChange={(e) => handleImageUpload(e, e.target.files)} type="file" name='photo' className='hidden p-2 bg-gray-200 rounded-md opacity-75 text-[12px] ' placeholder='Upload'/>
                Upload Photo
            </label> 
        </div>
    )
}

export default ImageUploader