import React, { useState } from 'react'
import { imageProps } from '../types'
import axios from 'axios'

type ImageUploaderProps = {
    photo: string | undefined
    setPhoto: React.Dispatch<React.SetStateAction<string | undefined>>
}

const ImageUploader = ({photo, setPhoto}: ImageUploaderProps) => {
    const [uploading, setUploading] = useState<boolean>(false)

    const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement> | React.DragEvent<HTMLDivElement>, files: FileList | null) => {
        if(files === null){
            return
        }

        setUploading(true)
        const formData = new FormData()
        formData.append('photo', files[0])

        try {
            const {data} = await axios.post('/auth/upload', formData, {
                headers: {'Content-Type':'multipart/form-data'}
            })
            setUploading(false)
            setPhoto(data.filePath)
            console.log(data)
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