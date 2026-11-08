import {ImagesIcon} from '@sanity/icons'
import {Button, Stack, Text} from '@sanity/ui'
import {randomKey} from '@sanity/util/content'
import {useCallback, useRef, useState} from 'react'
import {
  insert,
  setIfMissing,
  useClient,
  type ArrayOfObjectsInputProps,
  type ImageValue
} from 'sanity'

import {apiVersion} from '../env'

export function MultiImageArrayInput(props: ArrayOfObjectsInputProps) {
  const {onChange, readOnly, renderDefault} = props
  const client = useClient({apiVersion})
  const inputRef = useRef<HTMLInputElement>(null)
  const [isUploading, setIsUploading] = useState(false)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  const handleUpload = useCallback(
    async (files: FileList | null) => {
      if (!files || files.length === 0 || readOnly) {
        return
      }

      setIsUploading(true)
      setErrorMessage(null)

      try {
        const uploadedImages: ImageValue[] = await Promise.all(
          Array.from(files).map(async (file) => {
            const asset = await client.assets.upload('image', file, {
              filename: file.name
            })

            return {
              _type: 'image',
              _key: randomKey(12),
              asset: {
                _type: 'reference',
                _ref: asset._id
              }
            }
          })
        )

        onChange([
          setIfMissing([]),
          ...uploadedImages.map((image) => insert([image], 'after', [-1]))
        ])
      } catch (error) {
        const message =
          error instanceof Error ? error.message : 'Upload failed. Please try again.'
        setErrorMessage(message)
      } finally {
        setIsUploading(false)
        if (inputRef.current) {
          inputRef.current.value = ''
        }
      }
    },
    [client, onChange, readOnly]
  )

  return (
    <Stack space={3}>
      {renderDefault(props)}
      <Button
        icon={ImagesIcon}
        text={isUploading ? 'Uploading…' : 'Upload multiple photos'}
        mode="ghost"
        tone="primary"
        disabled={Boolean(readOnly) || isUploading}
        onClick={() => inputRef.current?.click()}
      />
      {errorMessage ? (
        <Text size={1} muted>
          {errorMessage}
        </Text>
      ) : null}
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        multiple
        hidden
        onChange={(event) => {
          void handleUpload(event.currentTarget.files)
        }}
      />
    </Stack>
  )
}
