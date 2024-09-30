'use client'

import React, { useState, useMemo } from 'react'
import Image from 'next/image'
import { ArrowUp, ArrowDown, Minus, ChevronRight, ChevronLeft, Trophy, Search, Clock } from 'lucide-react'
import mashreqLogo from './mashreq-logo.png'
import { Cairo } from 'next/font/google'

const cairo = Cairo({ subsets: ['latin'] })

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
  // New entries for the second page
  { name: "Sara Al-Mansoori", department: "Human Resources", speed: 73, accuracy: 91, engagement: 4, change: 'up', completionDate: "November 12, 2024" },
  { name: "Ahmed El-Sawy", department: "Marketing", speed: 82, accuracy: 89, engagement: 3, change: 'down', completionDate: "October 28, 2024" },
  { name: "Nadia Khalil", department: "Legal", speed: 69, accuracy: 97, engagement: 5, change: 'same', completionDate: "December 1, 2024" },
  { name: "Tariq Mahmood", department: "Operations", speed: 77, accuracy: 93, engagement: 4, change: 'up', completionDate: "November 9, 2024" },
  { name: "Leila Hakim", department: "Corporate Strategy", speed: 88, accuracy: 86, engagement: 3, change: 'down', completionDate: "October 31, 2024" },
  { name: "Hassan Abdel-Rahman", department: "Product Development", speed: 79, accuracy: 95, engagement: 5, change: 'up', completionDate: "November 25, 2024" },
  { name: "Rania El-Khoury", department: "Customer Experience", speed: 84, accuracy: 92, engagement: 4, change: 'same', completionDate: "December 3, 2024" },
  { name: "Karim Nasser", department: "Digital Banking", speed: 76, accuracy: 94, engagement: 4, change: 'down', completionDate: "November 17, 2024" },
  { name: "Yasmin Fawzi", department: "Financial Planning", speed: 71, accuracy: 98, engagement: 5, change: 'up', completionDate: "December 7, 2024" },
  { name: "Ali Al-Farsi", department: "International Relations", speed: 83, accuracy: 91, engagement: 3, change: 'down', completionDate: "November 2, 2024" },
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
  const [currentPage, setCurrentPage] = useState(1)
  const [searchTerm, setSearchTerm] = useState('')
  const playersPerPage = 10

  const sortedData = useMemo(() => {
    return [...mockData].sort((a, b) => {
      if (b.accuracy !== a.accuracy) return b.accuracy - a.accuracy
      if (a.speed !== b.speed) return a.speed - b.speed
      return b.engagement - a.engagement
    })
  }, [])

  const filteredData = useMemo(() => {
    return sortedData.filter(player => 
      player.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      player.department.toLowerCase().includes(searchTerm.toLowerCase())
    )
  }, [sortedData, searchTerm])

  const totalPages = Math.ceil(filteredData.length / playersPerPage)

  const currentPlayers = filteredData.slice(
    (currentPage - 1) * playersPerPage,
    currentPage * playersPerPage
  )

  const { daysLeft, startDate, endDate } = useMemo(() => {
    const start = new Date('2024-09-30')
    const end = new Date('2024-12-15')
    const today = new Date('2024-10-12') // Pretending today is October 12
    const timeDiff = end.getTime() - today.getTime()
    const daysRemaining = Math.ceil(timeDiff / (1000 * 3600 * 24))
    
    return {
      daysLeft: daysRemaining,
      startDate: start.toLocaleDateString('en-US', { month: 'long', day: 'numeric' }),
      endDate: end.toLocaleDateString('en-US', { month: 'long', day: 'numeric' })
    }
  }, [])

  return (
    <div className={`h-screen bg-gray-900 text-white p-8 flex flex-col ${cairo.className}`}>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold mb-2">Mashreq Culture Leaderboard</h1>
          <div className="flex items-center text-sm text-gray-400">
            <span>{startDate} - {endDate}</span>
            <div className="flex items-center ml-4 bg-gray-800 px-3 py-1 rounded-md">
              <Clock className="w-4 h-4 mr-2 text-blue-400" />
              <span className="font-semibold">{daysLeft} days left</span>
            </div>
          </div>
        </div>
        <Image
          src={mashreqLogo}
          alt="Mashreq Bank Logo"
          width={300}
          height={40}
          className="object-contain"
        />
      </div>
      <div className="mb-4 relative">
        <input
          type="text"
          placeholder="Search by name or department"
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value)
            setCurrentPage(1)  // Reset to first page on search
          }}
          className="w-full bg-gray-700 text-white px-4 py-2 pr-10 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
      </div>
      <div className="flex-grow bg-gray-800 rounded-lg overflow-hidden flex flex-col">
        <div className="flex-grow overflow-auto">
          {currentPlayers.map((player, index) => {
            const actualIndex = sortedData.indexOf(player)
            const isTopThree = actualIndex < 3
            return (
              <div key={index} className={`flex items-center p-4 ${index % 2 === 0 ? 'bg-gray-750' : 'bg-gray-800'} hover:bg-gray-700 transition-colors`}>
                <div className="flex items-center w-16">
                  {isTopThree ? (
                    <Trophy className={`w-6 h-6 ${
                      actualIndex === 0 ? 'text-yellow-400' :
                      actualIndex === 1 ? 'text-gray-400' :
                      'text-amber-600'
                    }`} />
                  ) : (
                    <ChangeIcon change={player.change} />
                  )}
                  <span className={`ml-2 font-bold ${isTopThree ? 'text-white' : 'text-gray-400'}`}>
                    {actualIndex + 1}
                  </span>
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
                    <div className="text-gray-400">Engagement</div>
                  </div>
                </div>
                <div className="w-20 text-center ml-8">
                  <div className={`font-bold text-lg ${
                    actualIndex === 0 ? 'text-yellow-400' :
                    actualIndex === 1 ? 'text-gray-400' :
                    actualIndex === 2 ? 'text-amber-600' :
                    'text-white'
                  }`}>
                    {(player.accuracy + player.speed / 2 + player.engagement * 10).toFixed(0)}
                  </div>
                  <div className="text-gray-400">Score</div>
                </div>
                <ChevronRight className="w-6 h-6 text-gray-500 ml-4" />
              </div>
            )
          })}
        </div>
        <div className="flex justify-between items-center p-4 bg-gray-750">
          <button
            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="flex items-center px-4 py-2 bg-gray-700 rounded-md disabled:opacity-50"
          >
            <ChevronLeft className="w-4 h-4 mr-2" />
            Previous
          </button>
          <span>Page {currentPage} of {totalPages}</span>
          <button
            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
            className="flex items-center px-4 py-2 bg-gray-700 rounded-md disabled:opacity-50"
          >
            Next
            <ChevronRight className="w-4 h-4 ml-2" />
          </button>
        </div>
      </div>
    </div>
  )
}