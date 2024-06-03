<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Accommodation;
use Illuminate\Support\Str;

class AccommodationSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run()
    {
        $data = [
            [   
                'accommodation_id' => '1258',
                'room_name' => 'Lake Villa 4 w/Jacuzzi',
                'type' => 'Lake Villa',
                'capacity' => '8-10',
                'description' => 'Lake Villa 1 is good for 1-2 persons with plated breakfast. 1 king size bed and own bathroom. Room can accommodate up to 3 pax with extra person charge.',
                'feature' => 'terrace overlooking Sirmata Lake',
                'price' => '18,000',
                'status' => 'Available',
                'images' => 'https://res.cloudinary.com/di0nkj5kz/image/upload/v1691416164/Sirmata%20Images/Accommodations/k49cbetfr2dsz7uajny2.jpg',
                'created_at' => '2023-08-07 05:49:25',
                'updated_at' => '2023-08-07 05:49:25',
            ],
            [
                'accommodation_id' => '2634',
                'room_name' => 'Alocasia Cabin',
                'type' => 'Cabin',
                'capacity' => '2-3',
                'description' => 'Cabin is good for 1-2 persons with plated breakfast. 1 king size bed and own bathroom. Room can accommodate up to 3 pax with extra person charge.',
                'feature' => 'private balcony',
                'price' => '6,000',
                'status' => 'Available',
                'images' => 'https://res.cloudinary.com/di0nkj5kz/image/upload/v1691416203/Sirmata%20Images/Accommodations/do2rl5xiwdn8edjojdi1.jpg',
                'created_at' => '2023-08-07 05:50:04',
                'updated_at' => '2023-08-07 05:50:04',
            ],
            [
                'accommodation_id' => '2959',
                'room_name' => 'Philodendron Cabin',
                'type' => 'Cabin',
                'capacity' => '2-3',
                'description' => 'Cabin is good for 1-2 persons with plated breakfast. 1 king size bed and own bathroom. Room can accommodate up to 3 pax with extra person charge.',
                'feature' => 'private balcony',
                'price' => '6,000',
                'status' => 'Available',
                'images' => 'https://res.cloudinary.com/di0nkj5kz/image/upload/v1691416510/Sirmata%20Images/Accommodations/tldqnlqmgrudbz7yuskc.jpg',
                'created_at' => '2023-08-07 05:55:11',
                'updated_at' => '2023-08-07 05:55:11',
            ],
            [
                'accommodation_id' => '3120',
                'room_name' => 'Caladium Cabin',
                'type' => 'Cabin',
                'capacity' => '7-10',
                'description' => 'Cabin is good for 1-2 persons with plated breakfast. 1 king size bed and own bathroom. Room can accommodate up to 3 pax with extra person charge.',
                'feature' => 'terrace overlooking Sirmata Lake',
                'price' => '10,000',
                'status' => 'Available',
                'images' => 'https://res.cloudinary.com/di0nkj5kz/image/upload/v1691416274/Sirmata%20Images/Accommodations/koroxy8tuhmvgrvp9jru.jpg',
                'created_at' => '2023-08-07 05:51:15',
                'updated_at' => '2023-08-07 05:51:15',
            ],
            [
                'accommodation_id' => '3356',
                'room_name' => 'Syngonium Cabin',
                'type' => 'Cabin',
                'capacity' => '7-10',
                'description' => 'Cabin is good for 1-2 persons with plated breakfast. 1 king size bed and own bathroom. Room can accommodate up to 3 pax with extra person charge.',
                'feature' => 'terrace overlooking Sirmata Lake',
                'price' => '10,000',
                'status' => 'Available',
                'images' => 'https://res.cloudinary.com/di0nkj5kz/image/upload/v1691416390/Sirmata%20Images/Accommodations/czujih1vusg5ayo6on7d.jpg',
                'created_at' => '2023-08-07 05:53:11',
                'updated_at' => '2023-08-07 05:53:11',
            ],
            [
                'accommodation_id' => '3958',
                'room_name' => 'Monstera Cabin',
                'type' => 'Cabin',
                'capacity' => '7-10',
                'description' => 'Cabin is good for 1-2 persons with plated breakfast. 1 king size bed and own bathroom. Room can accommodate up to 3 pax with extra person charge.',
                'feature' => 'private balcony',
                'price' => '10,000',
                'status' => 'Available',
                'images' => 'https://res.cloudinary.com/di0nkj5kz/image/upload/v1691416321/Sirmata%20Images/Accommodations/tlej4cty40auvqcgjl1t.jpg',
                'created_at' => '2023-08-07 05:52:02',
                'updated_at' => '2023-08-07 05:52:02',
            ],
            [
                'accommodation_id' => '4836',
                'room_name' => 'Lake Villa 2',
                'type' => 'Lake Villa',
                'capacity' => '4-6',
                'description' => 'Lake Villa 1 is good for 1-2 persons with plated breakfast. 1 king size bed and own bathroom. Room can accommodate up to 3 pax with extra person charge.',
                'feature' => 'private balcony, private parking area',
                'price' => '8,000',
                'status' => 'Available',
                'images' => 'https://res.cloudinary.com/di0nkj5kz/image/upload/v1691416051/Sirmata%20Images/Accommodations/apugz004ptgqvjgoi8nv.jpg',
                'created_at' => '2023-08-07 05:47:32',
                'updated_at' => '2023-08-07 05:47:32',
            ],
            [
                'accommodation_id' => '5395',
                'room_name' => 'Lake Villa 1',
                'type' => 'Lake Villa',
                'capacity' => '1-2',
                'description' => 'Lake Villa 1 is good for 1-2 persons with plated breakfast. 1 king size bed and own bathroom. Room can accommodate up to 3 pax with extra person charge.',
                'feature' => 'private balcony, private parking area',
                'price' => '5,000',
                'status' => 'Available',
                'images' => 'https://res.cloudinary.com/di0nkj5kz/image/upload/v1691415993/Sirmata%20Images/Accommodations/tjamlf8f3vzgmypbztzj.jpg',
                'created_at' => '2023-08-07 05:46:34',
                'updated_at' => '2023-08-07 05:46:34',
            ],
            [
                'accommodation_id' => '6731',
                'room_name' => 'Anthurium Cabin',
                'type' => 'Cabin',
                'capacity' => '7-10',
                'description' => 'Cabin is good for 1-2 persons with plated breakfast. 1 king size bed and own bathroom. Room can accommodate up to 3 pax with extra person charge.',
                'feature' => 'private balcony',
                'price' => '10,000',
                'status' => 'Available',
                'images' => 'https://res.cloudinary.com/di0nkj5kz/image/upload/v1691416455/Sirmata%20Images/Accommodations/ogpzm9yfhhantdphgswr.jpg',
                'created_at' => '2023-08-07 05:54:16',
                'updated_at' => '2023-08-07 05:54:16',
            ],
            [
                'accommodation_id' => '9197',
                'room_name' => 'Lake Villa 3',
                'type' => 'Lake Villa',
                'capacity' => '6-8',
                'description' => 'Lake Villa 1 is good for 1-2 persons with plated breakfast. 1 king size bed and own bathroom. Room can accommodate up to 3 pax with extra person charge.',
                'feature' => 'terrace overlooking Sirmata Lake',
                'price' => '15,000',
                'status' => 'Available',
                'images' => 'https://res.cloudinary.com/di0nkj5kz/image/upload/v1691416095/Sirmata%20Images/Accommodations/vripdmjh9nhbgdyr7xmx.jpg',
                'created_at' => '2023-08-07 05:48:16',
                'updated_at' => '2023-08-07 05:48:16',
            ]
            
            
            
        ];

        foreach ($data as $accommodationData) {
            Accommodation::create($accommodationData);
        }
    }
}