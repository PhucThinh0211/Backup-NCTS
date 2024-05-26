import { Carousel } from 'antd';

const partnerSlideShow = [
  {
    url: 'https://s3-alpha-sig.figma.com/img/3f5e/fde3/5868608031ec57805c9812c3a4d87ff7?Expires=1716163200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=Yf8kj7v6Yc797BXwEQC5gTTXEv~LMpwcNEKrCkKDk4wA7sNclMLSG8berUsRAyVlrNKp7u7DOzEfpzjyB6TWBu2f5I4N7j~8eAB5Aww0IR0F5arZIl1GfGR-d~pE7ocN7Ztx1D87DAwy5SStvadBJyZm-fhSL9jX8rj~Nr5d5ZPmzwDs2JpXSqYXkYLQfQvo4qbLquVUkZ9Owg8bJpyShZg~ndN1l2lBsMIFVY98NzImF2kNu24-~R3hBRZvnDo-sIrs149asjA~GwNFtoXpA3767~7XHIxmmaLZiYHoS1PzlKxXyZuqZI7R3SQAtgnocXbuitl-OpGyOA6OKv5mLg__',
  },
  {
    url: 'https://s3-alpha-sig.figma.com/img/de94/c27d/2c7f9b189167c08e00636cd3aaf0d99c?Expires=1716163200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=nTALyJVn1WSoa2ztD6F~RX3lGUeJu~9aczzE2zRNYUQ05m-kFjK~vQoVJyDTpByoD-l~0FKxQnmTq0HeWF1fLO9CilH7GxsEIyJ8lTI99J0vhTqPGyrOS1CA-9cUKFHWSpziMooQ5f5RzDhhS3tjUZDlDEVLIm-M62PkOD1g9vJJApONhX4G~OEUdC1nJO0~zriEItbowt9-GsPev6L-LMt2q5g960J4vLUIawkCpRVlsvJYu23-MvtPs-~i~v6RUtm8cKGgWAW1a99Ct9yy7hl2ljflsvchyt718c1GyDDitlNTHY8M8x9pUPZPMjYTAjVC3FFQzqyoW-C2iNcOJw__',
  },
  {
    url: 'https://s3-alpha-sig.figma.com/img/cd1c/9fd1/c1a0359a5d832bc2422c65770b736c94?Expires=1716163200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=nQ654Nse3D7E3oG1gxhrpdbN4FaFph7A6Cfj60ZtykWV5oaky2RF-D7S-~isz1wE8Mi1odEKQ3EdnR~3bgNhuXQRAVHotu8H7lx4mu7Wvs4KRXF~aPUFU16o7xQbZvpcitG6J3-SKah-2IsjBwwauQ5x4q0SJ6QGa6QvrVw6WrwbDAf-ejgyBRuCXBSXnZbeFL3eqBdX8ItVnASE~DCXywcReUPx~smzvn~mH9ZCJBoqI8btnFT5NebR-5He84daHhuBost5JsJkPTWLVWzfh7aKjzASnuYF44ow2v8OAGIlAVl3fO6LjCQUJxC4JlnYd9kCanGrN-p9G~GCzAIXDw__',
  },
  {
    url: 'https://s3-alpha-sig.figma.com/img/c719/1547/4bfc2f7c9efa9d29de9be01d974f77f0?Expires=1716163200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=WZqb6zOO6PQNmVDTACW1gxzL8hcqdq2EyIIJsp62x5BOqwCpLiV8aFQi55CYQ6LspzfBhGKjcv882Fl9IzjuPRIIBIX7X71tB9tPdSTZGya3GvaGV1T1w-LmkRFA6eaBuFfeFvA5Ai2fJ0T4s6u8wrzNjHvTNLqTowgvUTQ0l8rGpE4CC-05aBJVEkDFiYuCMrwNMMCoRr5MSjsWbFavRefWWKhMvQCvrYTMAbJuhirbObcU~wxSnWexC3a5agRvGZGgrLg6KNWb5RxAlyfO5wfm28AswGDWBbPubYBlwcwtjxNNEb5ID7VCzCcTf5myywRznlSl434n7PUQC9pp8Q__',
  },
  {
    url: 'https://s3-alpha-sig.figma.com/img/2c3c/682d/52a440d4d0c167fa67550a299d6bc5fe?Expires=1716163200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=RCwwByFuAzabSd6dKWAmcHfKsErog4RfTJfDafG8MChh~ncfJivapBxlzfdYplHPTVSLDONodkXSyj~FhIWzrkRvtLA1IRMKO5-L4tV6wAq9-Ie7q1JgkGMN1tD7YdUn5GoI4UGNn2cLKRblPV-oTSY6NojZqYfU99WvHoPGOccL3FcbiYTWopxOB3S5-G7X2zxzElFjDOLcoAyxas7RpArF-P-jzc0NTdyagB4xtYe1~ndbM6bNYfSYaXAuC6YK-hmGGewUUHcWYsK1QmaUHBZzEPnyJkOVWLicjFnLwuO-j0VLgyWSb-3G~cBAXhGiGKFBnO49-yD7rs2Pzool~w__',
  },
  {
    url: 'https://s3-alpha-sig.figma.com/img/bced/84e1/f2391025c13fef8ae2a4ad529e639532?Expires=1716163200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=KlI9iXd2HH95ywvr0x0Uvj~HH5fRz8IxymAcj3bLRcQHsZWdZS-7-fOTa-T82tw2SUeb73fE51i~GoPHn9IoZ~MREVx2ZFyGBjwjHagnCZQo4rmAh6jRzGDuXoMK0iTsybDKOFcdY60NO1tKqGTAWXNlHKFXRBmTj5QKE2XCVJQ-b37ZqURaBaWc08tPj79IuWc3w4xjtD3IAsNcn2VAx6alRb4n1faIjcm28qx7-AIGgvGIUJBwtJtWx08aE~mWrJDGiX9z5py1lXeEOF10je2h-wrZuxlKB6IGXfu2S9kRc~0Mt8SuI9EItf8lPp2Xyc5W1yO1TcT6cANcWewdqg__',
  },
  {
    url: 'https://s3-alpha-sig.figma.com/img/ed95/1033/92a2e599387a8e088a5c4bc709026da1?Expires=1716163200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=hfJ8qcOtcrFWdzI0CQZ6g7z69RRyTOY4hcBnDUl7IVeQlMGMH6HqOo4wR8rFUPTvq5HB3hfrKkRZbKY4yGbEFnxdz8pQ32etdXlpguqJ4n8OG3hFKek7N43sM8YNxJvMUSCHMBabe~FdsAXWOL~wKsHaGBridoO8BVlczLtF-9F7rTaFYOaizv-VO1Yf-nfSz2A1NTsGe~MwRCnUZXNqNyUXlU0tPnYtiuL3zjS29mlQVGBVkWgo5e6~22q0a1hG04dDFEWZy-NcoEzb0KgvQ5IRF7n~EYDlKAxm2OHO8qnrzL1gbX8At~JfpsChnmCp0Vpv4qrM2yrO9FOh7KtycQ__',
  },
  {
    url: 'https://s3-alpha-sig.figma.com/img/8cf3/f562/eb544a48b59c7c5f4f9cb9dcf776c15b?Expires=1716163200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=EgMjewT0QmJiZYJd1jGes06IYba~L-sy2e33BmNcmyHCtiQJxkNqEMq4oBIOqv1EgtXMJDz9ThNJWPDpFpmTlMb-LAHQt3deLQskUxtVpRRBQTtkZuZz1~KgrTqgJ4GBcIDwoLsPgl7LjhMYnoR-wxCO-XA3joN2UBkcqZ~tJwyy8QyZvjlNHIiPKIKqNfvEtpuizTUgg7vlf6JSgqryfM7KanGpLlYvpjkYA62-cusx~rXGi~JHbGxgiwsaE6vz8uAGJ2kqPqf5JNFIQXZD-zpnANR~SxCUwNrFzfnt1fHMOcwAEtCpax24pWO5dwMHNderyeUrnDpCt4Bybr0bfw__',
  },
  {
    url: 'https://s3-alpha-sig.figma.com/img/3fa0/2518/ee82d0da596a1140ce4b69ed816935b3?Expires=1716163200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=TKdhc7M1raHZ9WUfr~ah6NZQjAf2S1sRpklCnMvEbPFiX9-LfzWVmEGezjchiJgEMSTsJztIO~sULE-1Iwdq1zOjublzWm4PHKO9eZ4bfGBS7PQPxoZA89WjXfl6fhO1B-5Ez-4h2PtzhUey~hbKbY1fezWNGcNZck6WGsaUesU3bGszMg3u~ncdYxr~QvqCxSA4jYxSO3NXFHlhC3-bpgKb7~s115Q9uzvo8OTc2RCF2Pp6FNwhP8kwo89y~mGtnCBoHsh8wTYZyBCrZlDeypGLzYUvCAiFpjvMDS7PDYnGvSO8cWUh2~qy80L128QkPHDKss3QNBc28T6eYqJCVQ__',
  },
  {
    url: 'https://s3-alpha-sig.figma.com/img/12d9/d588/5943d17fe36d00793ab716e88b420867?Expires=1716163200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=eM6zM07bC~~AMPx4G4mkMED0tvu991yYj2unBetA8AtVpbT2yBDYg1Y1sUnN6YgXQH-nJPG7dWhFLiN9jh41oYMnqJ4C0sQvmx8EHWTiglf4MkeFlTtD2su8t1476BSy7GGMsj3etiKhY~mC9cOWjwBgIs95tPXHyc4okEq3-JfTX-QxclJ2TUoJubKwcSAIu90rIyYjvzmYJOkQBa~wLikkylJNOtiu1gKrnrB0tIUDbb7CmLqd0WC-cK0ieN0O3U1E2EoJd8418shno8-~cnwQu3XBnOTtaS5xNKf4NcvHNiz3h3BGPxOKA1M29OHEgmECpv74lGKmMyTpXzFq-Q__',
  },
  {
    url: 'https://s3-alpha-sig.figma.com/img/8e09/4a9f/d237e97a63d76f619953a6e99e877e01?Expires=1716163200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=O58Cg0U~sDlJFWB83tddA4uBSoSG38694eqqrwxILfXy5OTGahvyChOg5~w6XXQIOyI-LQNs6LiPZGHJyWjfKbbJVpYr8pzR28ygFTbB70sw9LcTs~CiVVB6-qlmovjnYbUpUh8Yde40CfJ6g8Y-6GiCq~-iX0PBtttIFnl7P7AmVxi4nBT1jFGzuDv42q7nXLYQOKwdEVFHyxOXhDdkFjYZAUJlT0wXhXkYBfG9w-0chbzB4YVQihIMJlOBL2XEy4tLBxfZRig1sqGOP3rfrYQYGLo9l4FsNscXYClSUR1p7qBwuk6f9DscYs~Uf4vJHjznaeNgLaHc0cEqd2c~ew__',
  },
  {
    url: 'https://s3-alpha-sig.figma.com/img/a2dd/7507/8e24636a84d8a8e9757d1e2704fc8c87?Expires=1716163200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=bldKEAuu~WkHWr8xPbgksTFohJSVvi1Wmk74Efyp6eALmWE6kWBpA5q5d3~FTcV5XADINsEVAfYbRWDwYoieq~qjkslU8V~VCtlSHUZgOSY3ipKyFI0XLBCv8p7724j6W~JBRqxk2FM20xM0ETu2oXR2AAiFJ59-0i4zOvSKbT5ND55wvLVuLq3RIoOB6TXvF8p3esYnnIWas~v7Jrd~mVKEzJtqjBilu6bWZxNa8faoBYdIhYBlL7Wm5cOII1P-AdHf637YViFqAFACeDGRYWQPOv1I6TkmQnm2KuC5CeWry1QHTd0-SMl0LrzhQ8-fAR~A6HKn3ai~wbkg8OxsiA__',
  },
  {
    url: 'https://s3-alpha-sig.figma.com/img/2d52/f407/4f3398e049a2f33d760fabd2816e7fbf?Expires=1716163200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=UE~b1JWqnX0U8APJ97RLCj~HcAxLBajb8OgUT2-qn5-lyL-mfk6nd~to2kql0KbXOlAVYSi-eiWdJftSDZBeaUYWh00Ws4qNlsG5kPvR~Z5TuZRVeo7snaRXmEwbfQ0iplqO~lfkefHD5yngQ5~pidX3zisgnMaIKYu2F9vfOvOhK9DSic6lPz~sxBL5PqFbTMik2nX3DGKwqZyE5U37cZHKLasjcvClVbAblvBTdDPAV4WBWoL3BMLh7gNckiRonXDGjXDRgtLu5zJy~XrF4S7nKgavYfYiyYTE~bHjgpKJtno6MqpS6lb4aVH853dUcCDNpDH0iFQm9A6qUyBwdA__',
  },
  {
    url: 'https://s3-alpha-sig.figma.com/img/160b/ea06/4c4ec6bd1a1932121fe8c60adfde7952?Expires=1716163200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=DbXXMiXhmgqqwkBU1icP3VTtfCtDGdEjPvRfgbz9Djau~nEA4APHq~m~wwyrDErTEgL~u79Rknir8s1TO-np3bMAOt-BdZgY70fMTR-FVbh1kYPurL8SgTiZODpEkNoAkjFopzNJAKocbhUhg0jocpLj4fpFDvr8cykTf2s04s7nNu-EzbWKSbq8963ssbY7WMeIdRoFF2dQb5ytNSq6mylMvDQn7EP6lxwSndMTdh47V1G1DrMVMfbm3GNLPXRnFEBROFZOlZuwojt6zONgqYvcvBbvWCe3Zve8EICRZLmgZqoetWLvKCG8ZS7alxRGn0A8C53C-hKQLOxM5G6Jcw__',
  },
  {
    url: 'https://s3-alpha-sig.figma.com/img/aac9/8512/ffe698b043a91d832786cd267415bf14?Expires=1716163200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=NweXpFmONUb-ZLmiFZp7DDzwa9X-2dQmn92Z90DsyxrcGqNMX-IjZq2vOFBmNSd7bVNpFobCSftAm2Dn5r32mIma0PgroR7-ZWNy3JGOL5rLKw75tkF01I1VGk56T3F1LKO18PLBUdPtZA3I8jKDRyS~HdzJukBqhzKz3knFxLCJLTzvbDd9lrNRoDMai-T~NSIfMNAv7eAaDhSfV~XF0CMokHy9EvJpdnHBJ~etbwAM6niOfwCLJZTJoGh999ZMpiUPBzRbVl3BroYtMngBwtp~spiE0l~Fl1RGkvh9dSjIS9IAEejbI3lZwqFww9qb7jY774clOrcdUu5evlQ5JQ__',
  },
  {
    url: 'https://s3-alpha-sig.figma.com/img/455b/e058/844bf14cca38da9a0937c0a34dcf25d1?Expires=1716163200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=i~A1p3epo~JulOp8LMibFzof0sSfa1s7EGa5mRBA02LMJp2QcCXUT8d-tb9~otlpVfnuvjxHSuyR3xPFLLwoEvxGbrCpLBCkr8arIWrBmEeO6Kz0nvPr4ZVdi7-JoETuZe84LqoPFeargPbHE1CHUdFM~dVcBaD2PEPAyE6O8BhaJ3nXDCYJGGL9ngrYijmFN8qJoKCfyG0JaYJzhev4M-rQKTYU4jhFEGl6GG~cDztRVzqTd2YkVj1JKIQwUw2fvqwLcRNd5nz8OoIhmYRsHoievk5SnsUwDryLyF~MKVeS2ql8b81raDzpeM9b2cCG9P6jNqa82OcNlEo4jav4Pw__',
  },
  {
    url: 'https://s3-alpha-sig.figma.com/img/a563/47bc/370bc6668fe3d20bdaf521e1a0fbe6b2?Expires=1716163200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=furpihFB0GSMq4FLWrj5Mv2496EOTjrgolQcOgpd83aeOom9k2Bjf7cTGuNmS1eThG8clMYjaHm~su~vxdI6Gb67IG7lZQM0h5GKF5Si9X7s4iAwfoFCdMN~jk6z8ymqWQsdcgTsMXRv2cjK4n~aXaQz08F4APieOZ~QounkAQQ178wtYnmfcthpqI~rdmlv43XTY9FOhRzkGNwqPXSp6mLPanov4b-qv2rJ1uPyA2AQhpgm3PrRnPllMP9oAiMs5USz~Bb6PU9Dn2qHBeP~BFsd0aEydNZ4gHuFTb-gq3m5TUg1jJQHtDh13kswi4nmWyM~US7fhQcbAD7z8bJdFQ__',
  },
];

export const CustomerLogoSection = () => {
  return (
    <div className="w-100 pb-3">
      <Carousel
        slidesToShow={6}
        dots={false}
        autoplay
        infinite={true}
        autoplaySpeed={2000}
        speed={2000}>
        {partnerSlideShow.map((i, index) => (
          <img className="imgSlideShow" src={i.url} key={index} />
        ))}
      </Carousel>
    </div>
  );
};