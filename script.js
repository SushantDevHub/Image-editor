const filters = {
    brightness: {
        value: 100,
        min: 0,
        max: 200,
        unit: '%'
    },
    contrast: {
        value: 100,
        min: 0,
        max: 200,
        unit: '%'
    },
    saturation: {
        value: 100,
        min: 0,
        max: 200,
        unit: '%'
    },
    hueRotation: {
        value: 0,
        min: 0,
        max: 360,
        unit: 'deg'
    },
    blur: {
        value: 0,
        min: 0,
        max: 10,
        unit: 'px'
    },
    grayscale: {
        value: 0,
        min: 0,
        max: 100,
        unit: '%'
    },
    sepia: {
        value: 0,
        min: 0,
        max: 100,
        unit: '%'
    },
    opacity: {
        value: 100,
        min: 0,
        max: 100,
        unit: '%'
    },
    invert: {
        value: 0,
        min: 0,
        max: 100,
        unit: '%'
    }

}

const imageCanvas = document.querySelector('#image-canvas')
const imageInput = document.querySelector('#image-input')
const canvasCtx = imageCanvas.getContext('2d')

let file = null
let image = null

const filtersContainer = document.querySelector('.filters')

function createFilterElement(name, unit = '%',value, min, max) {
    const div = document.createElement('div')
    div.classList.add('filter')

    const input = document.createElement('input')
    input.type = 'range'
    input.min = min
    input.max = max
    input.value = value
    input.id = name

    const p = document.createElement('p')
    p.innerText =  name

    div.appendChild(p)
    div.appendChild(input)

    input.addEventListener('input', (event) => {
        filters[name].value = input.value
        applyFilters()
    })
    return div

}

Object.keys(filters).forEach(key => {
   
    const filterElement = createFilterElement(key, filters[key].unit, filters[key].value, filters[key].min, filters[key].max)
    filtersContainer.appendChild(filterElement)

})

imageInput.addEventListener('change', (event) => { 
    const file = event.target.files[0]
    const imagePlaceolder = document.querySelector('.placeholder')
    imageCanvas.style.display = 'block'
    imagePlaceolder.style.display = 'none' // Hide the placeholder when an image is selected
 
    const img = new Image()
    img.src = URL.createObjectURL(file)

    img.onload = () => {
        image = img
            imageCanvas.width = img.width
            imageCanvas.height = img.height
        canvasCtx.drawImage(img, 0, 0)
         
    }
})

function applyFilters() {
    canvasCtx.clearRect(0, 0, imageCanvas.width, imageCanvas.height)
    canvasCtx.filter = `
    brightness(${filters.brightness.value}${filters.brightness.unit})
    saturate(${filters.saturation.value}${filters.saturation.unit})
    contrast(${filters.contrast.value}${filters.contrast.unit})
    hue-rotate(${filters.hueRotation.value}${filters.hueRotation.unit})
    blur(${filters.blur.value}${filters.blur.unit})

    grayscale(${filters.grayscale.value}${filters.grayscale.unit})
     
    sepia(${filters.sepia.value}${filters.sepia.unit})
    opacity(${filters.opacity.value}${filters.opacity.unit})
    invert(${filters.invert.value}${filters.invert.unit})
    `
    canvasCtx.drawImage(image, 0, 0)
}