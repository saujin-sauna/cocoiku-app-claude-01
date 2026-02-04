'use client'

import React, { useState } from 'react'
import {
  Map,
  Shuffle,
  Baby,
  Dog,
  Zap,
  Car,
  MapPin,
  Calendar,
  Clock,
  Heart,
  Share2,
  Search,
  Menu,
  X
} from 'lucide-react'

// 山形県のイベント情報（サンプルデータ）
const events = [
  {
    id: 1,
    title: '蔵王樹氷まつり',
    location: '蔵王温泉スキー場',
    date: '2024年2月1日〜2月28日',
    time: '17:00〜21:00',
    image: '/images/zao.jpg',
    tags: ['子供連れ', '駐車場あり'],
    description: '幻想的な樹氷のライトアップが楽しめます。家族連れに人気のイベント。',
    category: '自然・観光'
  },
  {
    id: 2,
    title: '山形そばまつり',
    location: '山形市中央公園',
    date: '2024年2月10日〜2月11日',
    time: '10:00〜16:00',
    image: '/images/soba.jpg',
    tags: ['子供連れ', 'ペット連れ', '駐車場あり'],
    description: '県内各地の名店が集まる山形そばの祭典。ペット同伴エリアもあります。',
    category: 'グルメ'
  },
  {
    id: 3,
    title: '鶴岡雛物語',
    location: '鶴岡市内各所',
    date: '2024年2月下旬〜3月上旬',
    time: '9:00〜17:00',
    image: '/images/hina.jpg',
    tags: ['子供連れ', 'EV充電'],
    description: '江戸時代から伝わる雛人形が市内各所で展示されます。',
    category: '文化・歴史'
  }
]

// フィルターオプション
const filterOptions = [
  { id: 'kids', label: '子供連れ', icon: Baby, color: 'bg-pink-100 text-pink-600 border-pink-200' },
  { id: 'pets', label: 'ペット連れ', icon: Dog, color: 'bg-amber-100 text-amber-600 border-amber-200' },
  { id: 'ev', label: 'EV充電', icon: Zap, color: 'bg-blue-100 text-blue-600 border-blue-200' },
  { id: 'parking', label: '駐車場あり', icon: Car, color: 'bg-green-100 text-green-600 border-green-200' }
]

export default function Home() {
  const [activeMode, setActiveMode] = useState<'map' | 'decide'>('map')
  const [activeFilters, setActiveFilters] = useState<string[]>([])
  const [showMenu, setShowMenu] = useState(false)
  const [favorites, setFavorites] = useState<number[]>([])

  const toggleFilter = (filterId: string) => {
    setActiveFilters(prev =>
      prev.includes(filterId)
        ? prev.filter(f => f !== filterId)
        : [...prev, filterId]
    )
  }

  const toggleFavorite = (eventId: number) => {
    setFavorites(prev =>
      prev.includes(eventId)
        ? prev.filter(id => id !== eventId)
        : [...prev, eventId]
    )
  }

  const getRandomEvent = () => {
    const randomIndex = Math.floor(Math.random() * events.length)
    alert(`今日のおすすめ: ${events[randomIndex].title}`)
  }

  // フィルターされたイベント
  const filteredEvents = activeFilters.length === 0
    ? events
    : events.filter(event =>
        activeFilters.some(filter => {
          const filterLabel = filterOptions.find(f => f.id === filter)?.label
          return event.tags.includes(filterLabel || '')
        })
      )

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-blue-50">
      {/* ヘッダー */}
      <header className="bg-gradient-to-r from-green-500 to-blue-500 text-white shadow-lg">
        <div className="max-w-md mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <button
              onClick={() => setShowMenu(!showMenu)}
              className="p-2 hover:bg-white/20 rounded-lg transition-colors"
            >
              {showMenu ? <X size={24} /> : <Menu size={24} />}
            </button>

            <h1 className="text-2xl font-bold tracking-wide">
              <span className="text-yellow-300">coco</span>iku
            </h1>

            <button className="p-2 hover:bg-white/20 rounded-lg transition-colors">
              <Search size={24} />
            </button>
          </div>

          <p className="text-center text-sm text-white/80 mt-1">
            山形県のお出かけ情報
          </p>
        </div>
      </header>

      {/* モード切り替え */}
      <div className="max-w-md mx-auto px-4 py-4">
        <div className="bg-white rounded-2xl shadow-md p-1 flex">
          <button
            onClick={() => setActiveMode('map')}
            className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl font-medium transition-all ${
              activeMode === 'map'
                ? 'bg-gradient-to-r from-green-500 to-green-600 text-white shadow-md'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            <Map size={20} />
            <span>マップビュー</span>
          </button>

          <button
            onClick={() => {
              setActiveMode('decide')
              getRandomEvent()
            }}
            className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl font-medium transition-all ${
              activeMode === 'decide'
                ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-md'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            <Shuffle size={20} />
            <span>決める！モード</span>
          </button>
        </div>
      </div>

      {/* フィルター：だれと？ */}
      <div className="max-w-md mx-auto px-4 pb-4">
        <h2 className="text-sm font-semibold text-gray-600 mb-2 flex items-center gap-2">
          <span className="w-1 h-4 bg-gradient-to-b from-green-500 to-blue-500 rounded-full"></span>
          だれと？
        </h2>
        <div className="flex flex-wrap gap-2">
          {filterOptions.map(filter => {
            const Icon = filter.icon
            const isActive = activeFilters.includes(filter.id)
            return (
              <button
                key={filter.id}
                onClick={() => toggleFilter(filter.id)}
                className={`flex items-center gap-1.5 px-3 py-2 rounded-full text-sm font-medium border-2 transition-all ${
                  isActive
                    ? filter.color + ' shadow-sm'
                    : 'bg-white text-gray-500 border-gray-200 hover:border-gray-300'
                }`}
              >
                <Icon size={16} />
                <span>{filter.label}</span>
              </button>
            )
          })}
        </div>
      </div>

      {/* マップエリア（プレースホルダー） */}
      {activeMode === 'map' && (
        <div className="max-w-md mx-auto px-4 pb-4">
          <div className="bg-gradient-to-br from-green-100 to-blue-100 rounded-2xl h-48 flex items-center justify-center border-2 border-dashed border-green-300">
            <div className="text-center text-gray-500">
              <MapPin size={40} className="mx-auto mb-2 text-green-500" />
              <p className="text-sm">山形県マップ</p>
              <p className="text-xs text-gray-400">Coming Soon...</p>
            </div>
          </div>
        </div>
      )}

      {/* イベントリスト */}
      <div className="max-w-md mx-auto px-4 pb-20">
        <h2 className="text-sm font-semibold text-gray-600 mb-3 flex items-center gap-2">
          <span className="w-1 h-4 bg-gradient-to-b from-green-500 to-blue-500 rounded-full"></span>
          おすすめイベント
          <span className="text-xs bg-green-100 text-green-600 px-2 py-0.5 rounded-full ml-auto">
            {filteredEvents.length}件
          </span>
        </h2>

        <div className="space-y-4">
          {filteredEvents.map(event => (
            <div
              key={event.id}
              className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-lg transition-shadow"
            >
              {/* イベント画像プレースホルダー */}
              <div className="h-32 bg-gradient-to-r from-green-200 to-blue-200 relative">
                <div className="absolute top-3 left-3">
                  <span className="bg-white/90 backdrop-blur-sm text-xs font-medium px-2 py-1 rounded-full text-gray-700">
                    {event.category}
                  </span>
                </div>
                <div className="absolute top-3 right-3 flex gap-2">
                  <button
                    onClick={() => toggleFavorite(event.id)}
                    className={`p-2 rounded-full backdrop-blur-sm transition-colors ${
                      favorites.includes(event.id)
                        ? 'bg-red-500 text-white'
                        : 'bg-white/90 text-gray-500 hover:text-red-500'
                    }`}
                  >
                    <Heart size={16} fill={favorites.includes(event.id) ? 'currentColor' : 'none'} />
                  </button>
                  <button className="p-2 bg-white/90 backdrop-blur-sm rounded-full text-gray-500 hover:text-blue-500 transition-colors">
                    <Share2 size={16} />
                  </button>
                </div>
                <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-black/30 to-transparent"></div>
              </div>

              {/* イベント情報 */}
              <div className="p-4">
                <h3 className="font-bold text-lg text-gray-800 mb-1">
                  {event.title}
                </h3>

                <div className="flex items-center gap-1 text-gray-500 text-sm mb-1">
                  <MapPin size={14} />
                  <span>{event.location}</span>
                </div>

                <div className="flex items-center gap-3 text-gray-500 text-sm mb-2">
                  <div className="flex items-center gap-1">
                    <Calendar size={14} />
                    <span>{event.date}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock size={14} />
                    <span>{event.time}</span>
                  </div>
                </div>

                <p className="text-gray-600 text-sm mb-3">
                  {event.description}
                </p>

                {/* タグ */}
                <div className="flex flex-wrap gap-1">
                  {event.tags.map(tag => (
                    <span
                      key={tag}
                      className="text-xs px-2 py-1 rounded-full bg-gradient-to-r from-green-100 to-blue-100 text-gray-600"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredEvents.length === 0 && (
          <div className="text-center py-12 text-gray-500">
            <Search size={40} className="mx-auto mb-3 text-gray-300" />
            <p>条件に合うイベントが見つかりませんでした</p>
            <p className="text-sm text-gray-400">フィルターを変更してみてください</p>
          </div>
        )}
      </div>

      {/* ボトムナビゲーション */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg">
        <div className="max-w-md mx-auto px-4 py-2 flex justify-around">
          <button className="flex flex-col items-center py-2 px-4 text-green-600">
            <Map size={24} />
            <span className="text-xs mt-1 font-medium">探す</span>
          </button>
          <button className="flex flex-col items-center py-2 px-4 text-gray-400 hover:text-gray-600">
            <Heart size={24} />
            <span className="text-xs mt-1">お気に入り</span>
          </button>
          <button className="flex flex-col items-center py-2 px-4 text-gray-400 hover:text-gray-600">
            <Calendar size={24} />
            <span className="text-xs mt-1">予定</span>
          </button>
          <button className="flex flex-col items-center py-2 px-4 text-gray-400 hover:text-gray-600">
            <Menu size={24} />
            <span className="text-xs mt-1">メニュー</span>
          </button>
        </div>
      </nav>

      {/* メニューオーバーレイ */}
      {showMenu && (
        <div className="fixed inset-0 bg-black/50 z-50" onClick={() => setShowMenu(false)}>
          <div
            className="absolute left-0 top-0 bottom-0 w-72 bg-white shadow-xl"
            onClick={e => e.stopPropagation()}
          >
            <div className="bg-gradient-to-r from-green-500 to-blue-500 text-white p-6">
              <h2 className="text-xl font-bold">cocoiku</h2>
              <p className="text-sm text-white/80">山形県のお出かけ情報</p>
            </div>
            <nav className="p-4">
              <ul className="space-y-2">
                <li>
                  <a href="#" className="block px-4 py-3 rounded-lg hover:bg-gray-100 text-gray-700">
                    エリアから探す
                  </a>
                </li>
                <li>
                  <a href="#" className="block px-4 py-3 rounded-lg hover:bg-gray-100 text-gray-700">
                    カテゴリから探す
                  </a>
                </li>
                <li>
                  <a href="#" className="block px-4 py-3 rounded-lg hover:bg-gray-100 text-gray-700">
                    季節のイベント
                  </a>
                </li>
                <li>
                  <a href="#" className="block px-4 py-3 rounded-lg hover:bg-gray-100 text-gray-700">
                    設定
                  </a>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      )}
    </div>
  )
}
