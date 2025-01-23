# 듀티메이트.

## 팀원 소개

| <img alt="profile" src ="https://github.com/marunturtle.png" width ="100px"> | <img alt="profile" src ="https://github.com/github_seohyun.png" width ="100px"> | <img alt="profile" src ="https://github.com/minssungkim.png" width ="100px"> | <img alt="profile" src ="https://avatars.githubusercontent.com/u/154870548?v=4" width ="100px"> | <img alt="profile" src ="https://github.com/taeho99.png" width ="100px"> | <img alt="profile" src ="https://github.com/jongwooo.png" width ="100px"> |
|:---:|:---:|:---:|:---:|:---:|:---:|
| 이재현 (팀장) | 김서현 | 김민성 | 김현진 | 임태호 | 한종우 |
| [marunturtle](https://github.com/marunturtle) | [github_seohyun](https://github.com/github_seohyun) | [minssungkim](https://github.com/minssungkim) | [hyun0zin](https://github.com/hyun0zin) | [taeho99](https://github.com/taeho99) | [jongwooo](https://github.com/jongwooo) |


<br><br>

## NoSQL Collection 설계
월별 병동 듀티표 MongoDB에 저장
```json
{
  "_id": "507f191e810c19729de860ea", // UUID
  "ward_id": 1,
  "year" : 2025,
  "month" : 1,
  "prev_id" : "00000020f51bb4362eee2a4d",
  "prev_modify": {      // history 관리를 위한 직전 변경사항 저장 
	  "nurse_id": "123",
	  "nurse_name": "임태호",
	  "before": "D",
	  "after": "E",
	  "modified_day": 5
  },
  "nurses": [                                    // 간호사 배열
    {
      "nurse_id": "123",                         // 간호사 고유 ID
      "shifts": "DENOXDENOXDENOXDENOXDENOXDENOX" // 근무 스케줄
    },
    {
      "nurse_id": "124",
      "shifts": "DENOXDENOXDENOXDENOXDENOXDENOX"
    }
  ]
}
```