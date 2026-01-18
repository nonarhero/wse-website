'use client'

import { motion } from 'framer-motion'

const locations = [
  {
    name: 'สาขาสีลม',
    address: '123 ถนนสีลม แขวงสีลม เขตบางรัก กรุงเทพมหานคร 10500',
    phone: '02-123-4567',
    hours: 'จันทร์-ศุกร์: 10:00-20:00, เสาร์-อาทิตย์: 09:00-18:00',
    map: 'https://maps.google.com/?q=13.7299,100.5340',
  },
  {
    name: 'สาขาเซ็นทรัลเวิลด์',
    address: '999/9 ถนนราชดำริ แขวงลุมพินี เขตปทุมวัน กรุงเทพมหานคร 10330',
    phone: '02-234-5678',
    hours: 'ทุกวัน: 10:00-21:00',
    map: 'https://maps.google.com/?q=13.7477,100.5395',
  },
  {
    name: 'สาขาเซ็นทรัลพัทยา',
    address: '333/99 หมู่ที่ 5 ถนนพัทยาใต้ ตำบลหนองปรือ อำเภอบางละมุง จังหวัดชลบุรี 20150',
    phone: '038-123-456',
    hours: 'ทุกวัน: 10:00-21:00',
    map: 'https://maps.google.com/?q=12.9236,100.8825',
  },
  {
    name: 'สาขาเดอะมอลล์ บางกะปิ',
    address: '3522 ถนนลาดพร้าว แขวงคลองจั่น เขตบางกะปิ กรุงเทพมหานคร 10240',
    phone: '02-345-6789',
    hours: 'ทุกวัน: 10:00-21:00',
    map: 'https://maps.google.com/?q=13.7688,100.6067',
  },
  {
    name: 'สาขาโรบินสัน บางรัก',
    address: '12 ถนนสีลม แขวงสีลม เขตบางรัก กรุงเทพมหานคร 10500',
    phone: '02-456-7890',
    hours: 'ทุกวัน: 10:00-21:00',
    map: 'https://maps.google.com/?q=13.7299,100.5340',
  },
  {
    name: 'สาขาเซ็นทรัล เฟสติวัล เชียงใหม่',
    address: '151 ถนนห้วยแก้ว ตำบลช้างเผือก อำเภอเมืองเชียงใหม่ จังหวัดเชียงใหม่ 50300',
    phone: '053-123-456',
    hours: 'ทุกวัน: 10:00-21:00',
    map: 'https://maps.google.com/?q=18.7961,98.9794',
  },
  {
    name: 'สาขาเซ็นทรัล ภูเก็ต',
    address: '74-75 หมู่ที่ 5 ถนนบายพาส ตำบลวิชิต อำเภอเมืองภูเก็ต จังหวัดภูเก็ต 83000',
    phone: '076-123-456',
    hours: 'ทุกวัน: 10:00-21:00',
    map: 'https://maps.google.com/?q=7.8804,98.3923',
  },
  {
    name: 'สาขาเซ็นทรัล อยุธยา',
    address: '88/8 หมู่ที่ 4 ถนนโรจนะ ตำบลประตูชัย อำเภอพระนครศรีอยุธยา จังหวัดพระนครศรีอยุธยา 13000',
    phone: '035-123-456',
    hours: 'ทุกวัน: 10:00-21:00',
    map: 'https://maps.google.com/?q=14.3569,100.5686',
  },
  {
    name: 'สาขาเซ็นทรัล ขอนแก่น',
    address: '299/9 ถนนมิตรภาพ ตำบลในเมือง อำเภอเมืองขอนแก่น จังหวัดขอนแก่น 40000',
    phone: '043-123-456',
    hours: 'ทุกวัน: 10:00-21:00',
    map: 'https://maps.google.com/?q=16.4396,102.8314',
  },
  {
    name: 'สาขาเซ็นทรัล ลาดพร้าว',
    address: '1693 ถนนลาดพร้าว แขวงจันทรเกษม เขตจตุจักร กรุงเทพมหานคร 10900',
    phone: '02-567-8901',
    hours: 'ทุกวัน: 10:00-21:00',
    map: 'https://maps.google.com/?q=13.8270,100.5746',
  },
]

export default function Locations() {
  return (
    <div className="min-h-screen py-20">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-wse-blue mb-4">
            สาขาของเรา
          </h1>
          <p className="text-lg text-gray-600">
            ค้นหาสาขา Wall Street English ที่ใกล้คุณที่สุด
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {locations.map((location, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-white p-8 rounded-lg shadow-md border border-gray-200"
            >
              <h2 className="text-2xl font-semibold text-wse-blue mb-4">
                {location.name}
              </h2>
              
              <div className="space-y-3 text-gray-700">
                <div className="flex items-start">
                  <svg className="w-5 h-5 mr-2 mt-1 text-wse-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <p>{location.address}</p>
                </div>
                
                <div className="flex items-center">
                  <svg className="w-5 h-5 mr-2 text-wse-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  <a href={`tel:${location.phone}`} className="hover:text-wse-blue">
                    {location.phone}
                  </a>
                </div>
                
                <div className="flex items-start">
                  <svg className="w-5 h-5 mr-2 mt-1 text-wse-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <p>{location.hours}</p>
                </div>
              </div>
              
              <a
                href={location.map}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-block bg-wse-blue text-white px-6 py-2 rounded-lg hover:bg-wse-blue-light transition"
              >
                ดูแผนที่
              </a>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}
