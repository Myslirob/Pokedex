import * as tf from '@tensorflow/tfjs';
import pokemons from 'src/assets/pokemons.json';
import { usePokemonRecognizerContext } from 'src/pokemonRecognizer/provider';
import { createCanvas, loadImage } from 'canvas';

async function loadImageAndConvertToTensor(rawImage: string | Buffer) {
    const size = 64;
    const image = await loadImage(rawImage);
    const canvas = createCanvas(size, size);
    const context = canvas.getContext('2d');
    context.drawImage(image, 0, 0, size, size);
    const imageData = context.getImageData(0, 0, size, size).data;
    let float32Array = new Float32Array(imageData);
    float32Array = float32Array.filter((_, index) => (index + 1) % 4);
    const tensor = tf.tensor3d(float32Array, [size, size, 3], 'float32');
    return tensor;
}

export const usePokemonRecognizer = () => {
    const model = usePokemonRecognizerContext();

    const predict = async (image: string | Buffer) => {
        if (model) {
            const imageTensored = await loadImageAndConvertToTensor(image);
            const imgArray = tf.expandDims(imageTensored);
            const predictions = model.predict(imgArray);
            //@ts-expect-error
            const score = tf.softmax(predictions.arraySync()[0]);
            const index = tf.argMax(score).dataSync()[0];
            const pokemon = pokemons[index];
            return pokemon ?? 'Unknown';
        }
        return 'Unknown';
    };

    return {
        predict,
    };
};
