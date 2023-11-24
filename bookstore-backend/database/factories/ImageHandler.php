<?php

namespace Database\Factories;

use Illuminate\Support\Facades\Storage;

/**
 * @return string
 */
class ImageHandler
{
    /**
     * @param $path
     * @return string
     */
    public function getImageFromStore($path): string
    {
        return "data:image/jpg;base64," . base64_encode(Storage::disk('public')->get($path));
    }

    /**
     * @return string
     */
    public function getRandomImage($tag = '', $width = 400, $height = 400): string
    {
        $imageContent = file_get_contents('https://source.unsplash.com/random/' . $width . 'x' . $height . '/?' . $tag);
        $filename = 'image_' . uniqid() . '.jpg';
        $disk = 'public';
        Storage::disk($disk)->put($filename, $imageContent);
        return $filename;
    }
}

