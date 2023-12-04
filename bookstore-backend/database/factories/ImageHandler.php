<?php

namespace Database\Factories;

use Illuminate\Support\Facades\Storage;

/**
 * @return string
 */
class ImageHandler
{
    const PathToFolder = 'public';

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
        $disk = self::PathToFolder;
        self::saveToDisk($filename, $imageContent, $disk);
        return $filename;
    }

    public static function makeUniqueFileName($image): string
    {
        return $filename = 'image_' . uniqid() . '.' . $image->getClientOriginalExtension();
    }

    public static function saveToDisk($filename, $imageContent, $disk): void
    {
        Storage::putFileAs($disk, $imageContent, $filename);
    }
}

