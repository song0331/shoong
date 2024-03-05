import { useLoaderData } from 'react-router';
import PhocaItem from '../PhocaItem/PhocaItem';


/**
 *
 * @param {{
 *  phocaImgSrc: string,
 *  logoImgSrc: string,
 *  groupName: string,
 *  memberName: string,
 *  imgClass: string,
 *  infoClass: string,
 *  groupClass: string,
 *  memberClass: string,
 *  title: string,
 *  titleClass: string,
 *  likeCount: number,
 *  linkClass: string,
 * }} props
 * @returns
 */


export default function PhocaContainer({
  phocaImgSrc,
  logoImgSrc,
  groupName,
  imgClass,
  infoClass,
  groupClass,
  memberClass,
  memberName,
  title,
  titleClass,
  likeCount,
  linkClass,
}) {

  const phoca = useLoaderData();

  // console.log(phoca);

  // 전체 그룹에 있는 모든 photoCards를 하나의 배열로 통합
  const allPhoca = phoca.reduce((acc, group) => {
    return acc.concat(group.expand.photoCards);
  }, []);

  // console.log(allPhoca);

  // 통합된 photoCards 배열을 created 필드 기준으로 최신순으로 정렬
  const latestCreatedPhoca = allPhoca.sort((a, b) => new Date(b.created) - new Date(a.created));

  // console.log(latestCreatedPhoca);
  // 상위 10개의 photoCards만 선택
  const latestCreatedTop10Phoca = latestCreatedPhoca.slice(0, 10);
// console.log(latestCreatedTop10Phoca)


  return (
    <div className="draggable mb-7 mt-7">
      <ul className=" draggable flex gap-4 overflow-x-scroll">
      {latestCreatedTop10Phoca.map((card, index) => (
            <li
              key={index}
              className="list-none m-0 p-0 w-44 relative"
            >
              <PhocaItem
                phocaImgSrc={`https://shoong.pockethost.io/api/files/photoCards/${card.id}/${card.cardImg}`}
                logoImgSrc={`https://shoong.pockethost.io/api/files/photoCards/${card.id}/${card.logoImage}`}
                groupName={card.groupName}
                memberName={card.memberName}
                title={card.title}
                likeCount={card.likeCount}
                titleClass={titleClass}
                imgClass={imgClass}
                infoClass={infoClass}
                groupClass={groupClass}
                memberClass={memberClass}
                linkClass={linkClass}
              />
            </li>
          ))}
      </ul>
    </div>
  );
}
