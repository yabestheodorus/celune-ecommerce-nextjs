'use client'

import { useGLTF, useTexture } from '@react-three/drei'
import { useEffect } from 'react'

export default function PreloadModels() {
  useEffect(() => {
    // Preload the main model and its textures as soon as the layout mounts
    useGLTF.preload('/models/cosmetic_cream_jar.glb')
    useTexture.preload('/images/label.png')
    console.log('3D Assets Preloaded')
  }, [])

  return null
}
