import { CompositionRoot } from '../composition-root';
import { Config } from '../config';

const config = new Config('start');

let composition: CompositionRoot;

export async function bootstrap() {
  composition = CompositionRoot.create(config);
  return composition.start();
}
