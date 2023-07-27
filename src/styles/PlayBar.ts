import tw from "tailwind-styled-components";

export const PlayBarContainer = tw.div` fixed bottom-8 h-20   lg:hidden z-30 grid  w-full start-0 end-0 grid-cols-[64px_auto_29px] md:grid-cols-[73px_auto_39px]`;

export const Player = tw.div`col-start-2 bg-white/90 rounded-b-[15px] relative w-full overflow-hidden grid grid-cols-[1.7fr_2fr_6fr_2fr]  p-4 items-center`;

export const TimeFlow = tw.div`ml-4 col-start-2 text-xs text-default-500`;

export const TrackInfoBox = tw.div`grid grid-cols-[auto_4fr] grid-rows-2`;

export const AlbumCoverBox = tw.div`h-12 w-12 relative flex align-middle rounded-md shadow-2xl justify-center bg-white overflow-hidden aspect-square col-start-1 row-start-1 row-span-2`;
export const AlbumCoverImg = tw.img`aspect-square bg-cover rounded-md`;

export const Title = tw.span`text-sm font-semibold text-default-600`;
export const Artist = tw.span`text-xs text-default-400`;
