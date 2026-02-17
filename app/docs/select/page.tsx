'use client';

import { useState, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Button } from '@/components/ui/button';

interface Major {
  code: string;
  name: string;
}

interface YearData {
  year: string;
  majors: Major[];
}

// Static data for year and major selection
// This avoids the complexity of parsing the page tree
const yearData: YearData[] = [
  {
    year: '2025',
    majors: [
      { code: '0601', name: '经济学' },
      { code: '23L01', name: '计算机与电子通信' },
      { code: '25L21', name: '集成电路' },
      { code: '25L51', name: '智能机器人' },
    ],
  },
  {
    year: '2024',
    majors: [
      { code: '0103', name: '自动化类' },
      { code: '020101', name: '电子信息类' },
      { code: '030301', name: '计算机类' },
      { code: '060101', name: '会计学' },
      { code: '060102', name: '财务管理' },
      { code: '23L01', name: '计算机与电子通信' },
      { code: '23L03', name: '机器人与智能装备' },
      { code: '23L04', name: '人工智能' },
      { code: '23L06', name: '经济管理试验班' },
      { code: '23L07', name: '土木工程' },
      { code: '23L08', name: '智能建筑' },
      { code: '23L09', name: '智慧交通' },
      { code: '24L02', name: '新材料' },
      { code: '24L03', name: '新能源' },
      { code: '24L04', name: '智能装备' },
      { code: '24L05', name: '智慧生态环境类' },
    ],
  },
  {
    year: '2023',
    majors: [
      { code: '010101', name: '计算机科学与技术' },
      { code: '0103', name: '自动化类' },
      { code: '020101', name: '电子信息类' },
      { code: '020103', name: '通信工程' },
      { code: '030101', name: '机械设计制造及其自动化' },
      { code: '030102', name: '材料成型及控制工程' },
      { code: '030201', name: '自动化' },
      { code: '030301', name: '电气工程及其自动化' },
      { code: '030401', name: '智能装备' },
      { code: '040101', name: '土木工程' },
      { code: '040201', name: '给排水科学与工程' },
      { code: '050101', name: '建筑学' },
      { code: '050102', name: '城乡规划' },
      { code: '060101', name: '会计学' },
      { code: '060102', name: '财务管理' },
      { code: '070101', name: '经济学' },
      { code: '070202', name: '数字经济' },
      { code: '080101', name: '应用物理学' },
      { code: '080201', name: '空间科学与技术' },
      { code: '080205', name: '光电信息科学与工程' },
      { code: '130508', name: '数字媒体艺术' },
      { code: '23L01', name: '计算机与电子通信' },
      { code: '23L02', name: '特色班' },
      { code: '23L03', name: '机器人与智能装备' },
      { code: '23L04', name: '人工智能' },
      { code: '23L05', name: '经济管理试验班' },
    ],
  },
  {
    year: '2022',
    majors: [
      { code: '010101', name: '计算机科学与技术' },
      { code: '0103', name: '自动化类' },
      { code: '0201', name: '电子信息类' },
      { code: '020101', name: '通信工程' },
      { code: '020103', name: '电子信息工程' },
      { code: '0301', name: '机械类' },
      { code: '030101', name: '机械设计制造及其自动化' },
      { code: '030102', name: '材料成型及控制工程' },
      { code: '030201', name: '自动化' },
      { code: '030301', name: '电气工程及其自动化' },
      { code: '030401', name: '智能装备' },
      { code: '040101', name: '土木工程' },
      { code: '040201', name: '给排水科学与工程' },
      { code: '050101', name: '建筑学' },
      { code: '060101', name: '会计学' },
      { code: '060102', name: '财务管理' },
      { code: '070101', name: '经济学' },
      { code: '070202', name: '数字经济' },
      { code: '080101', name: '应用物理学' },
      { code: '130508', name: '数字媒体艺术' },
    ],
  },
  {
    year: '2021',
    majors: [
      { code: '010101', name: '计算机科学与技术' },
      { code: '0201', name: '电子信息类' },
      { code: '020101', name: '通信工程' },
      { code: '020103', name: '电子信息工程' },
      { code: '0301', name: '机械类' },
      { code: '030101', name: '机械设计制造及其自动化' },
      { code: '030102', name: '材料成型及控制工程' },
      { code: '030201', name: '自动化' },
      { code: '030301', name: '电气工程及其自动化' },
      { code: '030401', name: '智能装备' },
      { code: '040101', name: '土木工程' },
      { code: '040201', name: '给排水科学与工程' },
      { code: '050101', name: '建筑学' },
      { code: '060101', name: '会计学' },
      { code: '060102', name: '财务管理' },
      { code: '070101', name: '经济学' },
      { code: '070202', name: '数字经济' },
      { code: '080101', name: '应用物理学' },
      { code: '080205', name: '光电信息科学与工程' },
    ],
  },
  {
    year: '2020',
    majors: [
      { code: '010101', name: '计算机科学与技术' },
      { code: '0201', name: '电子信息类' },
      { code: '020101', name: '通信工程' },
      { code: '020103', name: '电子信息工程' },
      { code: '0301', name: '机械类' },
      { code: '030101', name: '机械设计制造及其自动化' },
      { code: '030102', name: '材料成型及控制工程' },
      { code: '030201', name: '自动化' },
      { code: '030301', name: '电气工程及其自动化' },
      { code: '030401', name: '智能装备' },
      { code: '040101', name: '土木工程' },
      { code: '040201', name: '给排水科学与工程' },
      { code: '050101', name: '建筑学' },
      { code: '060101', name: '会计学' },
      { code: '060102', name: '财务管理' },
      { code: '070101', name: '经济学' },
      { code: '070202', name: '数字经济' },
      { code: '080101', name: '应用物理学' },
    ],
  },
  {
    year: '2019',
    majors: [
      { code: '010101', name: '计算机科学与技术' },
      { code: '020101', name: '通信工程' },
      { code: '030101', name: '机械设计制造及其自动化' },
      { code: '030201', name: '自动化' },
      { code: '030301', name: '电气工程及其自动化' },
      { code: '040101', name: '土木工程' },
      { code: '040201', name: '给排水科学与工程' },
      { code: '050101', name: '建筑学' },
      { code: '060101', name: '会计学' },
      { code: '060102', name: '财务管理' },
      { code: '070101', name: '经济学' },
      { code: '070202', name: '数字经济' },
      { code: '080101', name: '应用物理学' },
    ],
  },
];

export default function SelectPage() {
  const router = useRouter();
  const [selectedYear, setSelectedYear] = useState<string>('');
  const [selectedMajor, setSelectedMajor] = useState<string>('');

  // Get majors for the selected year
  const availableMajors = useMemo(() => {
    const yearDataItem = yearData.find((y) => y.year === selectedYear);
    return yearDataItem?.majors ?? [];
  }, [selectedYear]);

  // Reset major when year changes
  const handleYearChange = (year: string) => {
    setSelectedYear(year);
    setSelectedMajor('');
  };

  const handleGo = () => {
    if (selectedYear && selectedMajor) {
      router.push(`/docs/${selectedYear}/${selectedMajor}`);
    }
  };

  const canGo = selectedYear && selectedMajor;

  return (
    <div className="bg-muted fixed inset-0 flex flex-col items-center justify-center overflow-hidden bg-[url('/pawel-czerwinski-g0eRErPBoTA-unsplash.jpg')] bg-cover bg-center bg-no-repeat p-6">
      <div
        className="pointer-events-none absolute inset-0 bg-black/50"
        aria-hidden="true"
      />
      <div className="relative z-10 w-full max-w-sm">
        {/* Card */}
        <div className="bg-card rounded-xl border p-6 shadow-sm">
          {/* Header */}
          <div className="mb-6 text-center">
            <h1 className="text-foreground mb-1 text-xl font-semibold tracking-tight">
              欢迎使用 HOA
            </h1>
            <p className="text-muted-foreground text-sm">
              请选择你的入学年份和专业
            </p>
          </div>

          {/* Selection Form */}
          <div className="space-y-4">
            {/* Year Select */}
            <div className="space-y-2">
              <label className="text-foreground block text-sm font-medium">
                入学年份
              </label>
              <Select value={selectedYear} onValueChange={handleYearChange}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="请选择入学年份" />
                </SelectTrigger>
                <SelectContent>
                  {yearData.map(({ year }) => (
                    <SelectItem key={year} value={year}>
                      {year} 级
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Major Select */}
            <div className="space-y-2">
              <label className="text-foreground block text-sm font-medium">
                所在专业
              </label>
              <Select
                value={selectedMajor}
                onValueChange={setSelectedMajor}
                disabled={!selectedYear || availableMajors.length === 0}
              >
                <SelectTrigger className="w-full">
                  <SelectValue
                    placeholder={
                      selectedYear ? '请选择所在专业' : '请先选择入学年份'
                    }
                  />
                </SelectTrigger>
                <SelectContent>
                  {availableMajors.map((major) => (
                    <SelectItem key={major.code} value={major.code}>
                      {major.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Go Button */}
            <div className="pt-2">
              <Button
                className="w-full"
                size="lg"
                disabled={!canGo}
                onClick={handleGo}
              >
                提交
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
