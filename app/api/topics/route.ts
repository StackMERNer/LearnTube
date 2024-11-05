// // /app/api/topics/route.ts
// import { NextResponse } from 'next/server';
// import connectDB from '../../../lib/mongodb';
// import Topic from '../../../models/Topic';

// export async function POST(request: Request) {
//   await connectDB();
//   const { name, playlists } = await request.json();
//   const newTopic = new Topic({ name, playlists });
//   await newTopic.save();
//   return NextResponse.json(newTopic, { status: 201 });
// }

// export async function GET() {
//   await connectDB();
//   const topics = await Topic.find().populate('playlists');
//   return NextResponse.json(topics);
// }
