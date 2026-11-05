import Storefront from './storefront';
import {seedProducts} from '@/lib/seed';
import {defaultSettings} from '@/lib/types';
export default function Home(){return <Storefront initialProducts={seedProducts} initialSettings={defaultSettings}/>;}
