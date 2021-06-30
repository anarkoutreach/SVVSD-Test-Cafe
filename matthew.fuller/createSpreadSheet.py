import os
import xlsxwriter

# Create a workbook and add a worksheet.
workbook = xlsxwriter.Workbook('tests.xlsx')

def getNamesFromFile(path):  
    names = []
    with open(path, "r") as file:
        text = file.read()
        arr = text.split("test(")
        arr[0]=""
        for item in arr:
            itemArr = item.split(",")
            names.append(itemArr[0])
    return names

def getNamesOfTestsInFolder(folder):
    cwd = os.getcwd()
    arr = os.listdir(folder)
    print(arr)
    allNames = []
    for item in arr:
        if(os.path.isfile(cwd+ "/Tests/"+item)):
            print("test")
            allNames.append({'name':item,'data':getNamesFromFile(cwd+ "/Tests/"+item)})
    return allNames


names = getNamesOfTestsInFolder("./Tests/")
for item in names:
  
    row = 0
    col = 0
    worksheet = workbook.add_worksheet(item["name"])
    for name in item["data"]:
        worksheet.write(row,col,name)
        row+=1
workbook.close()