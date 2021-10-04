import { LngLatBounds, LngLat } from 'mapbox-gl'

export const COORDINATES = {
    NEW_YORK: new LngLatBounds(
        new LngLat(-74.53021606089538, 40.554427111501866),
        new LngLat(-73.40178393910435, 40.89912653561447),
    ),
}

export const DEFAULT_COORDINATES = COORDINATES.NEW_YORK
