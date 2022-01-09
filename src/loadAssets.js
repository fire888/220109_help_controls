import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader'
import { GLTFLoader } from  'three/examples/jsm/loaders/GLTFLoader'


import botSrc from './assets/botWalk.gltf'
import levelSrc from "./assets/level02.obj";
import skinSrc from "./assets/skin.jpg"
import levelMap from './assets/floor_outer_map2.jpg'


export const loadAssets = oncomplete => {
    load().then(assets => {
        const preparedAssets = prepareMeshes(assets)
        oncomplete(preparedAssets)
    })
}





const prepareMeshes = (assets) => {
    const matBot = new THREE.MeshPhongMaterial({ map: assets['mapBot']})
    const matLevel = new THREE.MeshPhongMaterial({ map: assets['mapLevel']})

    assets['bot'].scene.children[0].traverse(item => {
        item.material = matBot
    })

    assets['level'].traverse(item => {
        item.material = matLevel
    })

    return assets
} 




const load = () => {
    return new Promise(resolve => {

        const objLoader = new OBJLoader()
        const gltfLoader = new GLTFLoader()
        const textureLoader = new THREE.TextureLoader()


        const assets = {}

        gltfLoader.load(botSrc, res => {
            assets['bot'] = res
    
            
            objLoader.load(levelSrc, res => {
                assets['level'] = res
    
    
                textureLoader.load(skinSrc, img => {
                    img.wrapS = THREE.RepeatWrapping
                    img.wrapT = THREE.RepeatWrapping
                    assets['mapBot'] = img
    
                    textureLoader.load(levelMap, img => {
                        img.wrapS = THREE.RepeatWrapping
                        img.wrapT = THREE.RepeatWrapping
                        assets['mapLevel'] = img
                        
                        resolve(assets)
                    }) 
                })
            })
        })
    })
}  