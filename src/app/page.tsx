import Photos from "@/components/photos/Photos";
import type { IPhoto } from "@/types/photos.type";
//delete
import photo1 from '@/assets/1.jpg' 
import photo2 from '@/assets/2.jpg' 
import photo3 from '@/assets/3.jpg' 
import photo4 from '@/assets/4.jpg' 
import photo5 from '@/assets/5.jpg' 


const data: IPhoto[] = [ //delete
    {
        id: "1",
        src: photo1,
        alt: "photo_1",
        position: 1,
    },
    {
        id: "2",
        src: photo2,
        alt: "photo_2",
        position: 2,
        isLiked: true
    },
    {
        id: "3",
        src: photo3,
        alt: "photo_3",
        position: 3,
        isAddedToCart: true
    },
    {
        id: "4",
        src: photo4,
        alt: "photo_4",
        position: 4,
    },
    {
        id: "5",
        src: photo5,
        alt: "photo_5",
        position: 5,
    },
]

export default function Home() {
  return (
    <div>
      <Photos photos={data}/>
    </div>
  );
}
