const CAMERA_ANGLE_DEG = 40;
export const CAMERA_DISTANCE =30;
export const CAMERA_LOOK_AT_Y = -1.0;

const angleRad = (CAMERA_ANGLE_DEG * Math.PI) / 180;

export const CAMERA_HEIGHT = Math.sin(angleRad) * CAMERA_DISTANCE;
export const CAMERA_DEPTH = Math.cos(angleRad) * CAMERA_DISTANCE;
