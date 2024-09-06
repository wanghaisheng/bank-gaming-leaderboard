'use client'

import React from 'react'
import Image from 'next/image'
import { ArrowUp, ArrowDown, Minus, ChevronRight } from 'lucide-react'
import mashreqLogo from './mashreq-logo.png'

type Player = {
  name: string
  department: string
  speed: number
  accuracy: number
  engagement: number
  change: 'up' | 'down' | 'same'
  completionDate: string
}

const mockData: Player[] = [
  { name: "Fatima Al-Sayed", department: "Corporate Banking", speed: 75, accuracy: 98, engagement: 5, change: 'up', completionDate: "December 10, 2024" },
  { name: "Raj Patel", department: "Investment Banking", speed: 62, accuracy: 95, engagement: 4, change: 'down', completionDate: "November 28, 2024" },
  { name: "Amr Hassan", department: "Retail Banking", speed: 80, accuracy: 92, engagement: 4, change: 'same', completionDate: "December 5, 2024" },
  { name: "Zainab Mahmoud", department: "Risk Management", speed: 70, accuracy: 97, engagement: 5, change: 'up', completionDate: "November 15, 2024" },
  { name: "Priya Sharma", department: "Wealth Management", speed: 85, accuracy: 90, engagement: 3, change: 'down', completionDate: "October 30, 2024" },
  { name: "Omar Farouk", department: "Treasury", speed: 68, accuracy: 96, engagement: 4, change: 'up', completionDate: "November 22, 2024" },
  { name: "Aisha Abdullah", department: "Compliance", speed: 72, accuracy: 99, engagement: 5, change: 'same', completionDate: "December 8, 2024" },
  { name: "Vikram Singh", department: "IT Operations", speed: 65, accuracy: 93, engagement: 4, change: 'down', completionDate: "November 7, 2024" },
  { name: "Laila El-Masry", department: "Customer Service", speed: 90, accuracy: 88, engagement: 3, change: 'up', completionDate: "October 25, 2024" },
  { name: "Mohammed Al-Hashimi", department: "Islamic Banking", speed: 78, accuracy: 94, engagement: 4, change: 'down', completionDate: "November 19, 2024" },
]

const ChangeIcon = ({ change }: { change: 'up' | 'down' | 'same' }) => {
  switch (change) {
    case 'up':
      return <ArrowUp className="w-4 h-4 text-green-500" />
    case 'down':
      return <ArrowDown className="w-4 h-4 text-red-500" />
    default:
      return <Minus className="w-4 h-4 text-gray-500" />
  }
}

export default function Home() {
  const sortedData = [...mockData].sort((a, b) => {
    if (b.accuracy !== a.accuracy) return b.accuracy - a.accuracy
    if (a.speed !== b.speed) return a.speed - b.speed
    return b.engagement - a.engagement
  })

  return (
    <div className="min-h-screen bg-gray-900 text-white px-44 pt-10 relative">
      <div className="absolute top-4 right-4">
        <Image
          src={mashreqLogo}
          alt="Mashreq Bank Logo"
          width={120}
          height={40}
          className="object-contain"
        />
      </div>
      <h1 className="text-3xl font-bold mb-6 text-center">Mashreq Culture Leaderboard</h1>
      <div className="bg-gray-800 rounded-lg overflow-hidden">
        {sortedData.map((player, index) => (
          <div key={index} className={`flex items-center p-4 ${index % 2 === 0 ? 'bg-gray-750' : 'bg-gray-800'} hover:bg-gray-700 transition-colors`}>
            <div className="flex items-center w-12">
              <ChangeIcon change={player.change} />
              <span className={`ml-2 font-bold ${index < 3 ? 'text-yellow-400' : 'text-gray-400'}`}>{index + 1}</span>
            </div>
            <div className="w-10 h-10 bg-gray-600 rounded-full flex items-center justify-center mr-4">
              {player.name.charAt(0)}
            </div>
            <div className="flex-grow">
              <div className="font-bold">{player.name}</div>
              <div className="text-sm text-gray-400">{player.department}</div>
              <div className="text-xs text-gray-500">{player.completionDate}</div>
            </div>
            <div className="flex space-x-8 text-sm">
              <div className="w-20 text-center">
                <div className="font-bold">{player.speed}</div>
                <div className="text-gray-400">Speed</div>
              </div>
              <div className="w-20 text-center">
                <div className="font-bold">{player.accuracy}%</div>
                <div className="text-gray-400">Accuracy</div>
              </div>
              <div className="w-20 text-center">
                <div className="font-bold">{player.engagement}</div>
                <div className="text-gray-400">Engage</div>
              </div>
            </div>
            <div className="w-20 text-center ml-8">
              <div className={`font-bold text-lg ${index < 3 ? 'text-yellow-400' : 'text-white'}`}>
                {(player.accuracy + player.speed / 2 + player.engagement * 10).toFixed(0)}
              </div>
              <div className="text-gray-400">Score</div>
            </div>
            <ChevronRight className="w-6 h-6 text-gray-500 ml-4" />
          </div>
        ))}
      </div>
    </div>
  )
}