import { styled } from "styled-components";
import tw from "tailwind-styled-components";

export const HeaderImg = tw.div`absolute -top-6 -left-6 w-full h-[400px] bg-cover bg-center bg-no-repeat filter overflow-hidden`;

export const BlurredGradient = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 33.333333%;
  background: linear-gradient(rgba(0, 0, 0, 0) 0%, rgba(244, 244, 245, 1) 100%);
`;

export const ArtistInfo = tw.div`absolute z-10 text-white top-56 px-6`;
export const ArtistName = tw.h1`text-3xl font-bold mb-6`;
export const ArtistDesc = tw.div`w-full h-16 `;
export const Desc = tw.p`overflow-hidden text-ellipsis`;

export const Buttons = tw.div`flex flex-row`;
export const PlayAllBtn = tw.button``;
