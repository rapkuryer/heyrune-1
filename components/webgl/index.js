import { Float, useGLTF } from '@react-three/drei'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { useFrame as useRaf } from '@studio-freight/hamo'
import { useScroll } from 'hooks/use-scroll'
import { mapRange } from 'lib/maths'
import { useStore } from 'lib/store'
import { Suspense, useEffect, useMemo, useRef, useState } from 'react'
import {
  Color,
  DoubleSide,
  Euler,
  MathUtils,
  MeshPhysicalMaterial,
  Vector2,
  Vector3,
} from 'three'
import fragmentShader from './particles/fragment.glsl'
import vertexShader from './particles/vertex.glsl'

function Raf({ render = true }) {
  const { advance } = useThree()

  useRaf((time) => {
    if (render) {
      advance(time / 1000)
    }
  })
}

function Particles({
  width = 250,
  height = 250,
  depth = 250,
  count = 1000,
  scale = 100,
  size = 100,
}) {
  const positions = useMemo(() => {
    const array = new Array(count * 3)

    for (let i = 0; i < array.length; i += 3) {
      array[i] = MathUtils.randFloatSpread(width)
      array[i + 1] = MathUtils.randFloatSpread(height)
      array[i + 2] = MathUtils.randFloatSpread(depth)
    }

    return Float32Array.from(array)
  }, [count, scale, width, height, depth])

  const noise = useMemo(
    () =>
      Float32Array.from(
        Array.from({ length: count * 3 }, () => Math.random() * 100)
      ),
    [count]
  )

  const sizes = useMemo(
    () =>
      Float32Array.from(
        Array.from({ length: count }, () => Math.random() * size)
      ),
    [count, size]
  )

  const speeds = useMemo(
    () =>
      Float32Array.from(
        Array.from({ length: count }, () => 0.1 + Math.random() * 0.5)
      ),
    [count]
  )

  const scales = useMemo(
    () =>
      Float32Array.from(
        Array.from({ length: count }, () => 50 + Math.random() * 200)
      ),
    [count]
  )

  const material = useRef()
  const points = useRef()

  const uniforms = useMemo(
    () => ({
      uTime: {
        value: 0,
      },
      uColor: {
        // value: new Color('rgb(255, 152, 162)'),
        value: new Color('rgb(255, 207, 206)'),
        // value: new Color('rgb(255, 236, 234)'),
      },
      uScroll: {
        value: 0,
      },
      uResolution: {
        value: new Vector2(width, height),
      },
    }),
    []
  )

  useEffect(() => {
    uniforms.uResolution.value.set(width, height)
  }, [width, height])

  useFrame(({ clock }) => {
    uniforms.uTime.value = clock.elapsedTime
  })

  useScroll(({ scroll }) => {
    uniforms.uScroll.value = scroll
  })

  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-noise" args={[noise, 3]} />
        <bufferAttribute attach="attributes-size" args={[sizes, 1]} />
        <bufferAttribute attach="attributes-speed" args={[speeds, 1]} />
        <bufferAttribute attach="attributes-scale" args={[scales, 1]} />
      </bufferGeometry>
      <shaderMaterial
        ref={material}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        transparent
        uniforms={uniforms}
      />
    </points>
  )
}

const steps = [
  {
    position: [-0.1, -1.75, 0],
    scale: 0.045,
    rotation: [0, Math.PI * 0.5, 0],
    type: 1,
  },
  {
    position: [0.15, -0.4, 0],
    scale: 0.02,
    rotation: [
      MathUtils.degToRad(-45),
      MathUtils.degToRad(-135),
      MathUtils.degToRad(-45),
    ],
    type: 1,
  },
  {
    position: [0.15, -0.4, 0],
    scale: 0.02,
    rotation: [
      MathUtils.degToRad(45),
      MathUtils.degToRad(-315),
      MathUtils.degToRad(-45),
    ],
    type: 1,
  },
  {
    position: [-0.2, -0.35, 0],
    scale: 0.02,
    rotation: [
      MathUtils.degToRad(-90),
      MathUtils.degToRad(-405),
      MathUtils.degToRad(-45),
    ],
    type: 1,
  },
  {
    position: [-1.2, -0.6, 0],
    scale: 0.05,
    rotation: [
      MathUtils.degToRad(-90),
      MathUtils.degToRad(-405),
      MathUtils.degToRad(-45),
    ],
    type: 1,
  },
  {
    position: [-1.6, -0.6, 0],
    scale: 0.05,
    rotation: [
      MathUtils.degToRad(-90),
      MathUtils.degToRad(-405),
      MathUtils.degToRad(-45),
    ],
    type: 1,
  },
  {
    position: [0.16, -1.38, 0],
    scale: 0.05,
    rotation: [
      MathUtils.degToRad(0),
      MathUtils.degToRad(200),
      MathUtils.degToRad(-16),
    ],
    type: 2,
  },
  {
    position: [0, -0.68, 0],
    scale: 0.04,
    rotation: [
      MathUtils.degToRad(0),
      MathUtils.degToRad(-14),
      MathUtils.degToRad(-16),
    ],
    type: 2,
  },
  {
    position: [-0.22, -0.61, 0],
    scale: 0.03,
    rotation: [
      MathUtils.degToRad(0),
      MathUtils.degToRad(-(157 + 360)),
      MathUtils.degToRad(-16),
    ],
    type: 2,
  },
  {
    position: [0.2, -0.46, 0],
    scale: 0.03,
    rotation: [
      MathUtils.degToRad(0),
      MathUtils.degToRad(-(340 + 360)),
      MathUtils.degToRad(-16),
    ],
    type: 2,
  },
]

// const thresholds = [0, 1000, 2000, 3000, 4000, 5000]

const material = new MeshPhysicalMaterial({
  color: new Color('#FF98A2'),
  metalness: 1,
  roughness: 0.4,
  wireframe: true,
  side: DoubleSide,
})

export function Arm() {
  const { scene: arm1 } = useGLTF('/models/arm.glb')
  const { scene: arm2 } = useGLTF('/models/arm2.glb')
  const [type, setType] = useState(1)

  const [{ color, roughness, metalness, wireframe }, setMaterialProps] =
    useState({
      color: '#b0b0b0',
      roughness: 0.4,
      metalness: 1,
      wireframe: false,
    })

  const [
    {
      lightsColor,
      light1,
      light2,
      light1Intensity,
      light2Intensity,
      ambientColor,
    },
    setLights,
  ] = useState({
    light1: [-200, 150, 50],
    light2: [300, -100, 150],
    light1Intensity: 1,
    light2Intensity: 1,
    lightsColor: '#FF98A2',
    ambientColor: '#0E0E0E',
  })

  const custom = false
  const scale = 0.05
  const position = [0, 0, 0]
  const rotation = [0, 0, 0]

  useEffect(() => {
    material.color = new Color(color)
    material.roughness = roughness
    material.metalness = metalness
    material.wireframe = wireframe
  }, [color, roughness, metalness, wireframe, material])

  useEffect(() => {
    if (arm1) {
      arm1.traverse((node) => {
        if (node.material) node.material = material
      })
    }
  }, [arm1, material])

  useEffect(() => {
    if (arm2) {
      arm2.traverse((node) => {
        if (node.material) node.material = material
      })
    }
  }, [arm2, material])

  const parent = useRef()

  const { viewport } = useThree()

  const _thresholds = useStore(({ thresholds }) => thresholds)
  const thresholds = useMemo(() => {
    return Object.values(_thresholds).sort((a, b) => a - b)
  }, [_thresholds])

  const [step, setStep] = useState(0)

  useEffect(() => {
    if (step === 0) {
      setLights((prev) => ({
        ...prev,
        light1Intensity: 0.35,
        light2Intensity: 0.15,
        lightsColor: '#FF98A2',
        ambientColor: '#FF98A2',
      }))
      setMaterialProps((prev) => ({
        ...prev,
        color: '#b0b0b0',
        roughness: 0.4,
        metalness: 1,
      }))
    } else {
      setLights((prev) => ({
        ...prev,
        light1Intensity: 1,
        light2Intensity: 1,
        lightsColor: '#efefef',
        ambientColor: '#b0B0B0',
      }))
      setMaterialProps((prev) => ({
        ...prev,
        color: '#efefef',
        roughness: 0.4,
        metalness: 0.6,
      }))
    }
  }, [step])

  useScroll(
    ({ scroll }) => {
      setStep(scroll < _thresholds['light-start'] ? 0 : 1)
    },
    [_thresholds]
  )

  useScroll(({ scroll }) => {
    if (!parent.current) return
    if (custom) {
      parent.current.scale.setScalar(viewport.height * scale)
      parent.current.position.set(
        viewport.width * position[0],
        viewport.height * position[1],
        0
      )
      parent.current.rotation.fromArray(
        rotation.map((v) => MathUtils.degToRad(v))
      )
      return
    }

    const current = thresholds.findIndex((v) => scroll < v) - 1

    const start = thresholds[current]
    const end = thresholds[current + 1]
    const progress = mapRange(start, end, scroll, 0, 1)

    const from = steps[current]
    const to = steps[current + 1]

    // return

    if (parent.current) {
      parent.current.visible = from?.type === to?.type
    }

    if (!to) return

    const _scale = mapRange(0, 1, progress, from.scale, to.scale)
    const _position = new Vector3(
      viewport.width *
        mapRange(0, 1, progress, from.position[0], to.position[0]),
      viewport.height *
        mapRange(0, 1, progress, from.position[1], to.position[1]),
      0
    )
    const _rotation = new Euler().fromArray(
      new Array(3)
        .fill(0)
        .map((_, i) =>
          mapRange(0, 1, progress, from.rotation[i], to.rotation[i])
        )
    )

    parent.current.scale.setScalar(viewport.height * _scale)
    parent.current.position.copy(_position)
    parent.current.rotation.copy(_rotation)

    setType(to.type)
    // const target = new Quaternion().setFromEuler(rotation)
    // parent.current.quaternion.rotateTowards(target, 16)
  })

  // const light1 = useRef()

  // useHelper(light1, DirectionalLightHelper, 'green')

  // const [target, setTarget] = useState()

  return (
    <>
      <ambientLight args={[new Color(ambientColor)]} />
      <group position={light1}>
        {/* <mesh scale={25}>
          <boxGeometry />
          <meshBasicMaterial color={'red'} />
        </mesh> */}
        <directionalLight args={[new Color(lightsColor), light1Intensity]} />
      </group>
      <group position={light2}>
        {/* <mesh scale={25}>
          <boxGeometry />
          <meshBasicMaterial color={'red'} />
        </mesh> */}
        <directionalLight args={[new Color(lightsColor), light2Intensity]} />
      </group>
      <Float floatIntensity={custom ? 0 : 1} rotationIntensity={custom ? 0 : 1}>
        <group
          ref={parent}
          // position={[viewport.width * 0.155, viewport.height * -0.6, 0]}
          // scale={viewport.height * 0.023}
          // rotation={[
          //   MathUtils.degToRad(125),
          //   MathUtils.degToRad(-57),
          //   MathUtils.degToRad(140),
          // ]}
        >
          {/* <TransformControls mode="rotate"> */}
          {type === 1 && <primitive object={arm1} scale={[1, 1, 1]} />}
          {type === 2 && <primitive object={arm2} scale={[1, 1, 1]} />}
          {/* </TransformControls> */}
        </group>
      </Float>
      {/* {target && (
        <TransformControls mode="translate" object={target} makeDefault />
      )} */}
      {/* <OrbitControls makeDefault /> */}
    </>
  )
}

function Content() {
  const { viewport } = useThree()

  return (
    <>
      {/* <OrbitControls makeDefault /> */}
      <Particles
        width={viewport.width}
        height={viewport.height}
        depth={800}
        count={180}
        scale={900}
        size={300}
      />

      <Arm />
    </>
  )
}

export function WebGL({ render = true }) {
  return (
    <Canvas
      gl={{
        powerPreference: 'high-performance',
        antialias: true,
        // stencil: false,
        // depth: false,
        alpha: true,
      }}
      dpr={[1, 2]}
      frameloop="never"
      orthographic
      camera={{ near: 0.01, far: 10000, position: [0, 0, 1000] }}
    >
      <Raf render={render} />
      <Suspense>
        <Content />
      </Suspense>
    </Canvas>
  )
}
