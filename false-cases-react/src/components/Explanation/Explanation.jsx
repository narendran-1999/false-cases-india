import React from 'react'
import './Explanation.css'
import DataTables from '../DataTables/DataTables'
import MethodImgs from './MethodImgs/MethodImgs'

const Explanation = () => {
  return (
    <div>
        <h2 id="methodology" className='mt-4'>How is estimation done?</h2>

        <MethodImgs />
        
        <div className="faq-box mt-4">
            <p><strong>Which categories are considered fake?</strong></p>
            <ul>
            <li>
                <strong>Final Report False: </strong> 
                Filed after confirming false report.
            </li>
            <li>
                <strong>Final Report Non-Cognizable: </strong> 
                Filed after confirming false report filed over a petty offence.
            </li>
            <li>
                <strong>Mistake of Fact or of Law or Civil Dispute: </strong> 
                Filed after confirming exaggeration or misinterpretation of incident by complainant, or false allegation filed over a civil dispute.
            </li>
            </ul>
            <p>
            Final reports of any category are filed by police with approval from court.<br/>
            <i>(Check reference #2 for details on these final report categories)</i>
            </p>
        </div>
        <div className="faq-box">
            <p><strong>Which categories are considered true incidents?</strong></p>
            <ul>
            <li>
                <strong>Cases Convicted: </strong>
                Convictions are made after proving guilt of accused.
            </li>
            </ul>
            <p>
            Faulty convictions later acquitted are not considered (i.e. conviction numbers are as they are in NCRB reports).
            </p>
        </div>
        <div className="faq-box">
            <p><strong>How is estimate calculated?</strong></p>
            <p>
            Estimated share of fake cases is calculated as percentage out of total cases that have reached solid conclusions.
            </p>
            <p>
            Formula
            </p>
        </div>

        <div id="faq">
        <h2>Frequently Asked Questions</h2>
        <div className="faq-box">
        <p><strong>1. Do false cases get resolved quickly?</strong></p>
        <p>No. The genuineness of a case has no effect on how quickly it reaches resolution.</p>
        <p><strong>Two strongest factors</strong> that quicken case conclusion:</p>
        <ul>
            <li>Clear-cut, solid evidence</li>
            <li>Better advocates</li>
        </ul>
        </div>
        <div className="faq-box">
        <p><strong>2. TheNewsMinute article on false cases by Geetika Mantri</strong></p>
        <p>This article, which claims that false cases are rare, presents 2020 NCRB data that is confined to a few categories under police disposal.</p>
            <p>It lacks proper research on terminology and <b>assumes that false cases only fall under FRF</b>.</p>
            <p>It <b>includes cases from previous years under investigation</b> into the whole set of data, but includes only cases closed as FRF in 2020 as false.</p>
            <p>It goes on to make a biased statistical interpretation that every other case including cases concluded with insufficient evidence involve true incidents, whereas they are actually unknown sets of data that can, at best, be estimated based on cases with solid conclusion as to whether the reported event happened or not.</p>
            <p><b>Withdrawn cases are mistakenly assumed to come under FRF</b>, when they are actually categorized in a dedicated column in court disposal data in NCRB reports. <b>Final reports are not filed for withdrawn complaints.</b></p>
            <p>Under the subheading <b>‘Misuse’ and how it really happens</b>, it starts off with <i>"we don’t know why the final report concluded it was a false allegation"</i>. Any police officer can clarify why. The CrPC (Criminal Procedure Code) does not allow such final reports without proper investigation, and requires approval from the court.</p>
        <p>The article in question has interpreted the data through a strong lens of confirmation bias.</p>
        <p>Link: <a href="https://www.thenewsminute.com/news/what-data-false-rape-cases-doesn-t-tell-us-163631" target="_blank">Article</a></p>
        <i>(See reference #2 - an article authored by the IGP of West Bengal - for details on final report categories)</i>
        </div>
        </div>

        <div id="verify-data">
        <h2>Data and References</h2>
        <p className="data-head">
        <b>NCRB 2016-2020 figures</b><br/>
        <i>(Click crime to view data)</i>
        </p>

        <DataTables />

        <p className="data-head">
        <b>References & Corroborating Resources</b>
        </p>
        <div className="reference-box">
        <h5>NCRB Reports 2016 - 2022</h5>
        <p>NCRB (National Crime Records Bureau) "Crime in India" reports 2016 - 2022</p>
        <p>Volume 1 - Chapter 3A (Crimes Against Women - All India)</p>
        <p className="ul-head">Tables:</p>
        <ul>
            <li>Police Disposal</li>
            <li>Court Disposal</li>
        </ul>
        <p><b>Link:</b> <a href="https://ncrb.gov.in/crime-in-india-year-wise.html?year=2022" target="_blank">NCRB 'Crime in India' Reports</a></p>
        </div>
        <div className="reference-box">
        <h5>Article on Final Report categories</h5>
        <p>An article explaining how final reports are filed by police under different categories. Provides context on categories that make up fake cases.</p>
        <p>Authored by <b>Md. Imran Wahab, the IGP of West Bengal</b> (as of 2024)</p>
        <p><b>Link:</b> <a href="https://legalserviceindia.com/legal/article-15803-final-report-submission-after-investigation-of-a-case.html" target="_blank">Article</a></p>
        </div>
        </div>
    </div>
  )
}

export default Explanation