/* eslint-env jest */

import {map} from './batch-update-mapper'

it('should update two photos', () => {
/* eslint-disable */
  const content = `
DSC00564.jpg

Title			Western Clown Anemonefish
Latin			Amphiprion ocellaris
Location		Dumaguete, The Philippines
Tags			anemonefish clownfish 2013 anemone
Description		Foo bar


DSC00266.jpg

Title			Western Clown Anemonefish
Location		Dumaguete, The Philippines
Tags			anemonefish clownfish 2013 anemone
Latin			Amphiprion ocellaris
Description		Clownfish hatch near the surface and travel deeper to search for a host anemone when they reach their juvenile stage. Within a clownfish community there is a strict hierarchy where juveniles begin at the bottom and have to gradually move upwards by proving their abilities to the rest of the population. During this time they may be victims to agression, and possibly eviction from the anemone by more mature clownfish.


DSC01136.jpg

Title			Nudibranch
Location		Dumaguete, The Philippines
Tags			nudibranch 2013
Latin			Chromodoris annae
Description


`
/* eslint-enable */
  const updated = map(content, getPhotos())

  expect(updated.length === 2).toBe(true)

  const [p1, p2] = updated
  expect(p1).toEqual({
    name: 'DSC00564.jpg',
    key: 'c051-e24f',
    title: 'Western Clown Anemonefish',
    latin: 'Amphiprion ocellaris',
    location: 'Dumaguete, The Philippines',
    tags: ['anemonefish', 'clownfish', '2013', 'anemone'],
    description: 'Foo bar'
  })

  expect(p2).toEqual({
    name: 'DSC01136.jpg',
    key: '47e7-02f9',
    title: 'Nudibranch',
    location: 'Dumaguete, The Philippines',
    tags: ['nudibranch', '2013'],
    latin: 'Chromodoris annae',
    description: ''
  })
})

it('should support whitespaces after key', () => {
    /* eslint-disable */
    const content = `
DSC00564.jpg

Title			Western Clown Anemonefish
Latin			Amphiprion ocellaris
Location		Dumaguete, The Philippines
Tags			anemonefish clownfish 2013 anemone
` + 'Description            \n' +
`

DSC01136.jpg

Title			Nudibranch
Location		Dumaguete, The Philippines
Tags			nudibranch 2013
Latin			Chromodoris annae
Description

`
    /* eslint-enable */

  const updated = map(content, getPhotos())

  expect(updated.length === 2).toBe(true)

  const [p1, p2] = updated
  expect(p1).toEqual({
    name: 'DSC00564.jpg',
    key: 'c051-e24f',
    title: 'Western Clown Anemonefish',
    latin: 'Amphiprion ocellaris',
    location: 'Dumaguete, The Philippines',
    tags: ['anemonefish', 'clownfish', '2013', 'anemone'],
    description: ''
  })

  expect(p2).toEqual({
    name: 'DSC01136.jpg',
    key: '47e7-02f9',
    title: 'Nudibranch',
    location: 'Dumaguete, The Philippines',
    tags: ['nudibranch', '2013'],
    latin: 'Chromodoris annae',
    description: ''
  })
})

function getPhotos () {
  return [
    {
      name: 'DSC00564.jpg',
      key: 'c051-e24f',
      title: 'Spotted Moray Eel',
      description: 'Unlike most fish who use suction to capture their prey, moray eels use two sets of jaws in their throats to drag their prey inside their mouths.',
      latin: 'Gymnothorax moringa',
      location: 'Bonaire, The Netherlands',
      tags: [
        '2016',
        'eel'
      ],
      mode: 'landscape',
      sizes: {
        thumb: {
          url: 'https://s3.eu-central-1.amazonaws.com/splendid-nudibranch-dev/c051-e24f/thumb_DSC00564.jpg',
          width: 220,
          height: 124
        },
        xsmall: {
          url: 'https://s3.eu-central-1.amazonaws.com/splendid-nudibranch-dev/c051-e24f/xs_DSC00564.jpg',
          width: 500,
          height: 281
        },
        small: {
          url: 'https://s3.eu-central-1.amazonaws.com/splendid-nudibranch-dev/c051-e24f/s_DSC00564.jpg',
          width: 1000,
          height: 563
        },
        medium: {
          url: 'https://s3.eu-central-1.amazonaws.com/splendid-nudibranch-dev/c051-e24f/m_DSC00564.jpg',
          width: 1400,
          height: 788
        },
        large: {
          url: 'https://s3.eu-central-1.amazonaws.com/splendid-nudibranch-dev/c051-e24f/l_DSC00564.jpg',
          width: 1900,
          height: 1069
        },
        xlarge: {
          url: 'https://s3.eu-central-1.amazonaws.com/splendid-nudibranch-dev/c051-e24f/xl_DSC00564.jpg',
          width: 2560,
          height: 1440
        }
      },
      detailsActive: false
    },
    {
      name: 'DSC00974.jpg',
      key: '81ad-bdb4',
      title: 'Garden Eels',
      description: 'Sometimes mistaken for swaying seagrass, these small eels live in colonies that can reach over thousand individuals. Each eel has its own burrow in the sand that it seldom leaves.',
      latin: '',
      location: 'Dumaguete, The Philippines',
      tags: [
        'eel',
        '2013'
      ],
      mode: 'landscape',
      sizes: {
        thumb: {
          url: 'https://s3.eu-central-1.amazonaws.com/splendid-nudibranch-dev/81ad-bdb4/thumb_DSC00974.jpg',
          width: 220,
          height: 124
        },
        xsmall: {
          url: 'https://s3.eu-central-1.amazonaws.com/splendid-nudibranch-dev/81ad-bdb4/xs_DSC00974.jpg',
          width: 500,
          height: 281
        },
        small: {
          url: 'https://s3.eu-central-1.amazonaws.com/splendid-nudibranch-dev/81ad-bdb4/s_DSC00974.jpg',
          width: 1000,
          height: 563
        },
        medium: {
          url: 'https://s3.eu-central-1.amazonaws.com/splendid-nudibranch-dev/81ad-bdb4/m_DSC00974.jpg',
          width: 1400,
          height: 788
        },
        large: {
          url: 'https://s3.eu-central-1.amazonaws.com/splendid-nudibranch-dev/81ad-bdb4/l_DSC00974.jpg',
          width: 1900,
          height: 1069
        },
        xlarge: {
          url: 'https://s3.eu-central-1.amazonaws.com/splendid-nudibranch-dev/81ad-bdb4/xl_DSC00974.jpg',
          width: 2560,
          height: 1440
        }
      },
      detailsActive: false
    },
    {
      name: 'DSC00598.jpg',
      key: '2d81-648d',
      title: 'Green Turtle',
      description: 'The green turtle inhabit coastal areas of as many as 140 countries. Together, The Caribbean Islands have one of the largest populations of green turtles in the world.',
      latin: 'Chelonia mydas',
      location: 'Bonaire, The Netherlands',
      tags: [
        '2016',
        'turtle'
      ],
      mode: 'landscape',
      sizes: {
        thumb: {
          url: 'https://s3.eu-central-1.amazonaws.com/splendid-nudibranch-dev/2d81-648d/thumb_DSC00598.jpg',
          width: 220,
          height: 124
        },
        xsmall: {
          url: 'https://s3.eu-central-1.amazonaws.com/splendid-nudibranch-dev/2d81-648d/xs_DSC00598.jpg',
          width: 500,
          height: 281
        },
        small: {
          url: 'https://s3.eu-central-1.amazonaws.com/splendid-nudibranch-dev/2d81-648d/s_DSC00598.jpg',
          width: 1000,
          height: 563
        },
        medium: {
          url: 'https://s3.eu-central-1.amazonaws.com/splendid-nudibranch-dev/2d81-648d/m_DSC00598.jpg',
          width: 1400,
          height: 788
        },
        large: {
          url: 'https://s3.eu-central-1.amazonaws.com/splendid-nudibranch-dev/2d81-648d/l_DSC00598.jpg',
          width: 1900,
          height: 1069
        },
        xlarge: {
          url: 'https://s3.eu-central-1.amazonaws.com/splendid-nudibranch-dev/2d81-648d/xl_DSC00598.jpg',
          width: 2560,
          height: 1440
        }
      },
      detailsActive: false
    },
    {
      name: 'DSC01136.jpg',
      key: '47e7-02f9',
      title: 'Atlantic Tarpon',
      description: 'A group of tarpons accompanied us during our night dives on Bonaire. These nocturnal hunters exploited the light from our torches to find prey.',
      latin: 'Megalops atlanticus',
      location: 'Bonaire, The Netherlands',
      tags: [
        '2016'
      ],
      mode: 'landscape',
      sizes: {
        thumb: {
          url: 'https://s3.eu-central-1.amazonaws.com/splendid-nudibranch-dev/47e7-02f9/thumb_DSC01136.jpg',
          width: 220,
          height: 124
        },
        xsmall: {
          url: 'https://s3.eu-central-1.amazonaws.com/splendid-nudibranch-dev/47e7-02f9/xs_DSC01136.jpg',
          width: 500,
          height: 281
        },
        small: {
          url: 'https://s3.eu-central-1.amazonaws.com/splendid-nudibranch-dev/47e7-02f9/s_DSC01136.jpg',
          width: 1000,
          height: 563
        },
        medium: {
          url: 'https://s3.eu-central-1.amazonaws.com/splendid-nudibranch-dev/47e7-02f9/m_DSC01136.jpg',
          width: 1400,
          height: 788
        },
        large: {
          url: 'https://s3.eu-central-1.amazonaws.com/splendid-nudibranch-dev/47e7-02f9/l_DSC01136.jpg',
          width: 1900,
          height: 1069
        },
        xlarge: {
          url: 'https://s3.eu-central-1.amazonaws.com/splendid-nudibranch-dev/47e7-02f9/xl_DSC01136.jpg',
          width: 2560,
          height: 1440
        }
      },
      detailsActive: false
    }
  ]
}
