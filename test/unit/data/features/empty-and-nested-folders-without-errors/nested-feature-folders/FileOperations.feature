# language: en
@File_Operations
Feature: Scenarios outline v2

  @File_Moving
  Scenario Outline: Move a file to another folder v2
    Given I move the file <fileName> to the folder <destinationFolder> in less than <timeout> seconds
    Then It is moved again to the origin folder

    Examples:
      | fileName                      | destinationFolder  | timeout |
      | /src/main/resources/test.docx | destinationFolder  | 5       |
      | /src/main/resources/test.docx | destinationFolder1 | 5       |

  @File_Copying
  Scenario Outline: Copy a file to another folder v2
    Given I copy the file <fileName> to the folder <destinationFolder> in less than <timeout> seconds
    Then It is deleted from the destination folder

    Examples:
      | fileName             | destinationFolder | timeout |
      | /resources/test.docx | destinationFolder | 5       |

  @pdfCompare
  Scenario: Compare two pdf files and return a pdf with the results v2
    Given I have the pdf file: document1.pdf in the resources folder
    And the pdf: document2.pdf in the resources folder
    When I compare them
    Then a pdf is created in the folder: src/main/resources with the result of the comparison