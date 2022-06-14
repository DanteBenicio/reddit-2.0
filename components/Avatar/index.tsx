import Image from 'next/image'
import { useSession } from 'next-auth/react'

interface AvatarProps {
  seed?: string
  large?: boolean
  size?: string | number
}

export default function Avatar({ large, seed, size }: AvatarProps) {
  const { data: session } = useSession()

  return (
    <div
      className={`relative overflow-hidden ${
        !size ? 'h-10 w-10' : `h-${size} w-${size}`
      }  ${large && 'h-20 w-20'} rounded-full border-gray-300 bg-white`}
    >
      <Image
        src={`https://avatars.dicebear.com/api/open-peeps/${
          seed || session?.user?.name || 'placeholder'
        }.svg`}
        alt="avatar img"
        layout="fill"
      />
    </div>
  )
}
