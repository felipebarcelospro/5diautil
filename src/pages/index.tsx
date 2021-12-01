import AdSense from 'react-ssr-adsense'
import NextHead from 'next/head'

import {
  Box,
  Flex,
  Heading,
  FormControl,
  FormLabel,
  Select,
  Button,
  Text,
  Divider,
  Grid,
  Checkbox,
  useColorMode,
  IconButton,
  useColorModeValue
} from '@chakra-ui/react'
import { ReactElement, useEffect, useState } from 'react'
import { Container } from '../components/container'
import { useForm } from 'react-hook-form'
import { FiMoon, FiSun } from 'react-icons/fi'
import { event } from '../lib/gtag'

type FormData = {
  month: number
  year: number
  enableSaturday: boolean
}

export default function Home(): ReactElement {
  const { register, handleSubmit } = useForm()
  const { colorMode, toggleColorMode } = useColorMode()

  const [result, setResult] = useState(5)

  function handleSubmitForm({ month, year, enableSaturday }: FormData) {
    event({
      action: 'calculate-util-day',
      category: 'submit-form',
      label: `${month}-${year}`
    })

    calculateUtilDay(Number(month), Number(year), enableSaturday)
  }

  function calculateUtilDay(
    month = new Date().getMonth(),
    year = new Date().getFullYear(),
    enableSaturday = false
  ) {
    const firstDay = new Date(year, month, 1)
    const lastDay = new Date(year, month + 1, 0)
    const monthDays: Date[] = []

    for (let i = firstDay.getDate(); i <= lastDay.getDate(); i++) {
      const day = new Date(year, month, i)
      monthDays.push(day)
    }

    const utilDays = monthDays.filter(day => {
      const dayOfWeek = day.getDay()

      if (enableSaturday) {
        return dayOfWeek !== 0
      }

      return dayOfWeek !== 0 && dayOfWeek !== 6
    })

    const FivethUtilDay = utilDays[4]

    setResult(FivethUtilDay.getDate())
  }

  useEffect(() => {
    calculateUtilDay()

    const ads = document.getElementsByClassName('adsbygoogle').length
    for (let i = 0; i < ads; i++) {
      try {
        ;(adsbygoogle = window.adsbygoogle || []).push({})
      } catch (e) {}
    }
  }, [])

  return (
    <Box as="main" pt="24" minH="100vh">
      <NextHead>
        <title>
          Calculadora de 5º dia útil - Calcule o 5º dia útil de graça
        </title>
        <meta
          name="title"
          content="Calculadora de 5º dia útil - Calcule o 5º dia útil de graça"
        />
        <meta
          name="description"
          content="Calcule o 5º dia útil rapidamente com a nossa calculadora online. Em apenas um clique saiba qual o 5º dia útil do mês que você precisar. Comece agora!"
        />

        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.5diautil.com.br/" />
        <meta
          property="og:title"
          content="Calculadora de 5º dia útil - Calcule o 5º dia útil de graça"
        />
        <meta
          property="og:description"
          content="Calcule o 5º dia útil rapidamente com a nossa calculadora online. Em apenas um clique saiba qual o 5º dia útil do mês que você precisar. Comece agora!"
        />
        <meta property="og:image" content="https://5diautil.com.br/cover.png" />

        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="https://www.5diautil.com.br/" />
        <meta
          property="twitter:title"
          content="Calculadora de 5º dia útil - Calcule o 5º dia útil de graça"
        />
        <meta
          property="twitter:description"
          content="Calcule o 5º dia útil rapidamente com a nossa calculadora online. Em apenas um clique saiba qual o 5º dia útil do mês que você precisar. Comece agora!"
        />
        <meta
          property="twitter:image"
          content="https://5diautil.com.br/cover.png"
        />
      </NextHead>

      <Box as="section" mb="12">
        <Container>
          <Heading fontSize="2xl" maxW="sm" mb="8">
            Calculadora de 5º dia útil
          </Heading>
          <Flex
            flexDir={{ base: 'column', md: 'inherit' }}
            alignItems={{ base: 'inherit', md: 'center' }}
            justifyContent="space-between"
          >
            <Grid
              as="form"
              onSubmit={handleSubmit(handleSubmitForm)}
              gridTemplateColumns={{ base: '1fr', md: '1fr 1fr 2fr auto' }}
              gap={{ base: 4, md: 4 }}
              width="100%"
              alignItems="end"
            >
              <FormControl id="year">
                <FormLabel>Selecione o ano</FormLabel>
                <Select
                  placeholder="Selecione..."
                  defaultValue={new Date().getFullYear()}
                  {...register('year')}
                >
                  {Array.from(new Array(30), (x, i) => i + 2000).map(year => (
                    <option key={year} value={year}>
                      {year}
                    </option>
                  ))}
                </Select>
              </FormControl>

              <FormControl id="month">
                <FormLabel>Selecione o mês</FormLabel>
                <Select
                  placeholder="Selecione..."
                  defaultValue={new Date().getMonth()}
                  {...register('month')}
                >
                  <option value="0">Janeiro</option>
                  <option value="1">Fevereiro</option>
                  <option value="2">Março</option>
                  <option value="3">Abril</option>
                  <option value="4">Maio</option>
                  <option value="5">Junho</option>
                  <option value="6">Julho</option>
                  <option value="7">Agosto</option>
                  <option value="8">Setembro</option>
                  <option value="9">Outubro</option>
                  <option value="10">Novembro</option>
                  <option value="11">Dezembro</option>
                </Select>
              </FormControl>

              <Checkbox {...register('enableSaturday')} mb="2">
                Considerar os sabados como dias úteis?
              </Checkbox>

              <Button type="submit" colorScheme="blue" boxShadow="base">
                Calcular 5º dia útil
              </Button>
            </Grid>
          </Flex>
        </Container>
      </Box>

      <Box as="section" mb="12">
        <Container>
          <Box
            h={52}
            d="flex"
            alignItems="center"
            justifyContent="center"
            boxShadow="base"
            borderRadius="base"
            border="1px solid"
            bg={useColorModeValue('gray.50', 'gray.900')}
            borderColor={useColorModeValue('gray.200', 'gray.800')}
          >
            <Flex flexDir="column" textAlign="center" alignItems="center">
              <Text as="small" fontSize="sm">
                DIA
              </Text>
              <Heading fontSize="6xl" color="blue.400">
                {result < 10 ? `0${result}` : result}
              </Heading>
            </Flex>
          </Box>
        </Container>
      </Box>

      <Box as="section">
        <Container>
          <Box
            h={{ base: 24, md: 52 }}
            d="flex"
            alignItems="center"
            justifyContent="center"
            border="1px dotted"
            borderRadius="base"
            bg={useColorModeValue('gray.50', 'whiteAlpha.200')}
            borderColor={useColorModeValue('gray.200', 'whiteAlpha.200')}
          >
            <ins
              className="adsbygoogle"
              data-ad-client="ca-pub-3482012731804317"
              data-ad-slot="8718184036"
              data-ad-format="auto"
              data-full-width-responsive="true"
            ></ins>
          </Box>
        </Container>
      </Box>

      <Divider my="24" />

      <Box as="section" mb="12">
        <Container>
          <Grid templateColumns={{ base: '1fr', md: '2fr 1fr' }} gap="24">
            <Box>
              <Box as="article" mb="12">
                <Heading as="h2" fontSize="xl" mb="4">
                  Calculadora de 5º dia útil: o que são os dias úteis?
                </Heading>
                <Text mb="2">
                  Os dias úteis são aqueles considerados para a semana de
                  trabalho. Tradicionalmente, são compostos por segunda, terça,
                  quarta, quinta e sexta.
                </Text>
                <Text mb="2">
                  No entanto, algum feriado que caia nessas datas o exclui da
                  contagem. Por isso, os dias úteis são aqueles em que o
                  trabalho não está suspenso.
                </Text>
                <Text>
                  Nessas datas, os estabelecimentos estão com seu funcionamento
                  normal. Devido a esse motivo, o sábado também pode ser
                  considerado dia útil, a depender do caso.
                </Text>
              </Box>
              <Box
                h={{ base: 24, md: 52 }}
                d="flex"
                alignItems="center"
                justifyContent="center"
                border="1px dotted"
                borderRadius="base"
                mb="12"
                bg={useColorModeValue('gray.50', 'whiteAlpha.200')}
                borderColor={useColorModeValue('gray.200', 'whiteAlpha.200')}
              >
                <ins
                  className="adsbygoogle"
                  data-ad-client="ca-pub-3482012731804317"
                  data-ad-slot="8718184036"
                  data-ad-format="auto"
                  data-full-width-responsive="true"
                ></ins>
              </Box>
              <Box as="article" mb="12">
                <Heading as="h2" fontSize="xl" mb="4">
                  Calculadora de 5º dia útil: Como calcular dias úteis?
                </Heading>
                <Text mb="2">
                  Para fazer o cálculo de dias úteis de forma manual, você deve
                  verificar o período considerado e excluir todos os dias de
                  sábado, domingos e feriados.
                </Text>
              </Box>
              <Box
                h={{ base: 24, md: 52 }}
                d="flex"
                alignItems="center"
                justifyContent="center"
                border="1px dotted"
                borderRadius="base"
                bg={useColorModeValue('gray.50', 'whiteAlpha.200')}
                borderColor={useColorModeValue('gray.200', 'whiteAlpha.200')}
              >
                <ins
                  className="adsbygoogle"
                  data-ad-client="ca-pub-3482012731804317"
                  data-ad-slot="8718184036"
                  data-ad-format="auto"
                  data-full-width-responsive="true"
                ></ins>
              </Box>
            </Box>
            <Box
              d={{ base: 'none', md: 'flex' }}
              h={72}
              w="100%"
              alignItems="center"
              justifyContent="center"
              border="1px dotted"
              borderRadius="base"
              bg={useColorModeValue('gray.50', 'whiteAlpha.200')}
              borderColor={useColorModeValue('gray.200', 'whiteAlpha.200')}
              mb="12"
            >
              <ins
                className="adsbygoogle"
                data-ad-client="ca-pub-3482012731804317"
                data-ad-slot="8718184036"
                data-ad-format="auto"
                data-full-width-responsive="true"
              ></ins>
            </Box>
          </Grid>
        </Container>
      </Box>

      <Box
        as="footer"
        bg={useColorModeValue('gray.50', 'whiteAlpha.200')}
        borderTop="1px solid"
        borderColor={useColorModeValue('gray.200', 'whiteAlpha.200')}
        h="24"
        d="flex"
        alignItems="center"
      >
        <Container
          w="100%"
          d="flex"
          alignItems="center"
          justifyContent="space-between"
        >
          <Text>
            Criado por <b>@felipebarcelospro</b>
          </Text>

          <IconButton
            icon={colorMode === 'light' ? <FiMoon /> : <FiSun />}
            onClick={() => toggleColorMode()}
            aria-label="Modo Dark"
          />
        </Container>
      </Box>
    </Box>
  )
}
