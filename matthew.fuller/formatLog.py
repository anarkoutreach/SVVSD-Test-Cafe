import os
import xlsxwriter

import re
 
def removeNonAplhNumChars(s):
    s2 = re.sub(r'[^ \w\n\r\+\-\(\)]', '', s)
    return s2
failsym = "ù"
succsesssym = "Ü"
fails =[]
succsesses = []
failNme = []
def check(arr, altArr, sym):
    for item in arr:
        tempArr = item.split(sym)
        altArr.append(removeNonAplhNumChars(str(tempArr[0])))
def spreadFromLog():
    global fails
    global succsesses
    workbook = xlsxwriter.Workbook("results.xlsx")
    successSheet = workbook.add_worksheet("succsesses")
    failSheet = workbook.add_worksheet("failsAndErrors")
    failSheet2 = workbook.add_worksheet("fails")
    
    workBookFormat = workbook.add_format()
    workBookFormat.text_wrap =1
    workBookFormat.set_align("top")
    failSheet2.write(0,0,'NAMES',workBookFormat)
    file = open("./tests.log")
    data = file.read()
    file.close()
    succsessArr = data.split(succsesssym)
    failArr = data.split(failsym)
    check(succsessArr,succsesses,failsym)
    check(failArr,fails,succsesssym)
    check(fails,failNme,"1)")
    #fails = ["test","test2","test3"]
    #succsesses = ["1","2","3"]
    row =0
    col =0
    for item in succsesses:
        print(item)
        successSheet.write(row,col,item,workBookFormat)
        row+=1
    row =0 
    for item in fails:
        if(row !=0):
            failSheet.write(row,1,item,workBookFormat)
            failSheet.set_row(row,len(item))
        row+=1
    row =0
    for item in failNme:
        if(row !=0):
            failSheet.write(row,0,item,workBookFormat)
            failSheet2.write(row,0,item,workBookFormat)
            failSheet2.set_row(row,20)
        row+=1
    row =0
    failSheet.set_column(1,2,150)
    failSheet.set_column(0,0,20)
    failSheet2.set_column(0,0,20)
    
    workbook.close()
    


    
    
spreadFromLog()