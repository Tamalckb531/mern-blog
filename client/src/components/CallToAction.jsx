import { Button } from 'flowbite-react';

export default function CallToAction() {
    return (
        <div className='flex flex-col sm:flex-row p-3 border border-teal-500 justify-center items-center rounded-tl-3xl rounded-br-3xl text-center'>
            <div className="flex-1 justify-center flex flex-col">
                <h2 className='text-2xl'>
                    Wanna impress your crush with shinning dance move?
                </h2>
                <p className='text-gray-500 my-2'>
                    Checkout these resources with Rock The Floor
                </p>
                <Button gradientDuoTone='purpleToPink' className='rounded-tl-xl rounded-bl-none'>
                    <a href="https://www.youtube.com/watch?v=dQw4w9WgXcQ" target='_blank' rel='noopener noreferrer'>
                        Rock The Floor
                    </a>
                </Button>
            </div>
            <div className="p-7 flex-1">
                <img src="https://www.shutterstock.com/image-photo/slow-motion-moves-collage-young-600nw-2268969849.jpg" />
            </div>
        </div>
    )
}